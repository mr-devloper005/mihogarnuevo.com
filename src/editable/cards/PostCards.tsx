import Link from 'next/link'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Essay'
}

// Stable, deterministic read-time estimate so cards always read well.
function readMinutes(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const body = [content.body, content.description, content.summary, post?.summary]
    .filter((value): value is string => typeof value === 'string')
    .join(' ')
  const words = body.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  if (words > 80) return Math.max(2, Math.round(words / 220))
  let h = 0
  const key = post?.slug || post?.id || post?.title || 'x'
  for (let i = 0; i < key.length; i += 1) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return 4 + (h % 9) // 4–12 min
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured essay' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="group relative block min-w-0 overflow-hidden rounded-3xl border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] transition duration-500 hover:border-[var(--editable-border-strong)] hover:shadow-[0_40px_90px_-40px_var(--slot4-accent-glow)]"
    >
      <div className="relative min-h-[460px] lg:min-h-[560px]">
        <img
          src={getEditablePostImage(post)}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover opacity-50 transition duration-700 group-hover:scale-105 group-hover:opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.15)_0%,rgba(8,8,10,0.55)_55%,rgba(8,8,10,0.95)_100%)]" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end p-7 sm:p-9 lg:min-h-[560px]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent-soft)]">{label}</span>
          <h3 className="editable-display mt-5 max-w-2xl text-3xl font-semibold leading-[1.05] tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/70 sm:text-base">{getEditableExcerpt(post, 180)}</p>
          <div className="mt-7 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-white/60">
            <span>{getEditableCategory(post)}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--slot4-accent)]" />
            <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" /> {readMinutes(post)} min read</span>
          </div>
          <span className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-white transition group-hover:gap-3">
            Read the essay <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className="group block w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:border-[var(--editable-border-strong)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          No. {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="editable-display mt-2.5 line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link
      href={href}
      className="group flex min-w-0 items-start gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-500 hover:-translate-y-1 hover:border-[var(--editable-border-strong)]"
    >
      <span className="editable-display flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--editable-border)] text-sm font-semibold text-[var(--slot4-accent)]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--slot4-accent)]">
          <Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}
        </p>
        <h3 className="editable-display mt-2 line-clamp-2 text-base font-semibold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href }: { post: SitePost; href: string; index?: number }) {
  return (
    <Link
      href={href}
      className="group grid min-w-0 gap-6 overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-4 transition duration-500 hover:-translate-y-1 hover:border-[var(--editable-border-strong)] hover:shadow-[0_30px_70px_-40px_var(--slot4-accent-glow)] sm:grid-cols-[260px_minmax(0,1fr)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden rounded-xl bg-[var(--slot4-media-bg)] sm:aspect-auto sm:min-h-[200px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-5 sm:pr-5">
        <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">
          <span>{getEditableCategory(post)}</span>
          <span className="h-1 w-1 rounded-full bg-[var(--slot4-accent)]/50" />
          <span className="text-[var(--slot4-soft-muted-text)]">{readMinutes(post)} min read</span>
        </div>
        <h2 className="editable-display mt-3 line-clamp-2 text-2xl font-semibold leading-tight tracking-[-0.02em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)] sm:text-3xl">{post.title}</h2>
        <p className="mt-3.5 line-clamp-3 text-[15px] leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 200)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)] transition group-hover:gap-3 group-hover:text-[var(--slot4-accent)]">
          Read the essay <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
