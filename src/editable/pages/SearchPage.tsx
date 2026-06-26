import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'
import { CATEGORY_OPTIONS } from '@/lib/categories'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''
const categoryOf = (post: SitePost) => compactRaw(getContent(post).category) || post.tags?.[0] || 'Essay'

// Hide profile content from public search results (profiles stay internal).
const isHiddenPost = (post: SitePost) => {
  const derived = getPostTaskKey(post) || compactText(getContent(post).type)
  return derived === 'profile'
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (derivedTask === 'profile') return false
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskRoute = SITE_CONFIG.tasks.find((item) => item.key === task)?.route
  const href = `${taskRoute || `/${task || 'article'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const strong = index % 6 === 0

  return (
    <Link
      href={href}
      data-reveal
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
      className={`group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:border-[var(--editable-border-strong)] hover:shadow-[0_30px_70px_-40px_var(--slot4-accent-glow)] ${strong ? 'md:col-span-2' : ''}`}
    >
      {image ? (
        <div className={`relative overflow-hidden bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">{categoryOf(post)}</span>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {!image ? <span className="w-fit rounded-full border border-[var(--editable-border)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-accent)]">{categoryOf(post)}</span> : null}
        <h2 className="editable-display mt-3 line-clamp-2 text-xl font-semibold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        {summary ? <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{stripHtml(summary)}</p> : null}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)] transition group-hover:gap-3 group-hover:text-[var(--slot4-accent)]">Read the essay <ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length
    ? feed.posts
    : useMaster
    ? []
    : SITE_CONFIG.tasks.filter((item) => item.enabled && item.key !== 'profile').flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => !isHiddenPost(post) && matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

  return (
    <EditableSiteShell>
      <main>
        <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
          <div className="pointer-events-none absolute -right-[12%] -top-[34%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,var(--slot4-accent-glow),transparent_62%)] blur-3xl" />
          <div className={`relative ${container} py-16 sm:py-20`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]" data-reveal="fade">{pagesContent.search.hero.badge}</p>
            <h1 className="editable-display mt-5 max-w-3xl text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-6xl" data-reveal>{pagesContent.search.hero.title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]" data-reveal style={{ transitionDelay: '80ms' }}>{pagesContent.search.hero.description}</p>

            <form action="/search" className="mt-9 flex flex-col gap-3 rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 sm:flex-row sm:items-center" data-reveal style={{ transitionDelay: '140ms' }}>
              <input type="hidden" name="master" value="1" />
              <label className="flex flex-1 items-center gap-3 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-5 py-3">
                <Search className="h-5 w-5 text-[var(--slot4-accent)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
              </label>
              <label className="flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-page-bg)] px-4 py-3 sm:w-52">
                <Filter className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                <select name="category" defaultValue={category} className="min-w-0 flex-1 bg-transparent text-sm outline-none">
                  <option value="">All topics</option>
                  {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
              </label>
              <button className="inline-flex items-center justify-center rounded-full bg-[var(--slot4-accent)] px-7 py-3 text-sm font-semibold text-white transition hover:brightness-110" type="submit">Search</button>
            </form>
          </div>
        </section>

        <section className={`${container} py-14 sm:py-16`}>
          <div className="flex flex-wrap items-end justify-between gap-4" data-reveal="fade">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{results.length} results</p>
              <h2 className="editable-display mt-2 text-3xl font-semibold tracking-[-0.025em]">{query ? `Results for “${query}”` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/article" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-2.5 text-sm font-semibold transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">Browse latest <ArrowUpRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-12 text-center">
              <Search className="mx-auto h-7 w-7 text-[var(--slot4-muted-text)]" />
              <p className="editable-display mt-5 text-2xl font-semibold tracking-[-0.02em]">No matching essays found.</p>
              <p className="mt-2.5 text-sm text-[var(--slot4-muted-text)]">Try a different keyword or topic.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
