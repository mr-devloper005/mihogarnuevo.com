import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock3, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { pagesContent } from '@/editable/content/pages.content'
import {
  getEditableCategory,
  getEditableExcerpt,
  getEditablePostImage,
  postHref,
  EditorialFeatureCard,
  CompactIndexCard,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

function readMinutes(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const body = [content.body, content.description, content.summary, post?.summary]
    .filter((v): v is string => typeof v === 'string')
    .join(' ')
  const words = body.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
  if (words > 80) return Math.max(2, Math.round(words / 220))
  let h = 0
  const key = post?.slug || post?.id || post?.title || 'x'
  for (let i = 0; i < key.length; i += 1) h = (h * 31 + key.charCodeAt(i)) >>> 0
  return 4 + (h % 9)
}

function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  cta = 'View all',
}: {
  eyebrow: string
  title: string
  description?: string
  href?: string
  cta?: string
}) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between" data-reveal>
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{eyebrow}</p>
        <h2 className="editable-display mt-4 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl lg:text-5xl">
          <span className="editable-accent-gradient">{title}</span>
        </h2>
        {description ? <p className="mt-3 text-base leading-7 text-[var(--slot4-muted-text)]">{description}</p> : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-2.5 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
        >
          {cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  )
}

/* Grid card used across discovery sections. */
function FeedCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:border-[var(--editable-border-strong)] hover:shadow-[0_30px_70px_-40px_var(--slot4-accent-glow)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(8,8,10,0.55))] opacity-0 transition group-hover:opacity-100" />
        <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          {getEditableCategory(post)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="editable-display line-clamp-2 text-lg font-semibold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120)}</p>
        <div className="mt-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">
          <Clock3 className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {readMinutes(post)} min read
        </div>
      </div>
    </Link>
  )
}

/* ------------------------------- Hero ------------------------------- */
export function EditableHomeHero(_props: HomeSectionProps) {
  const hero = pagesContent.home.hero
  const topics = CATEGORY_OPTIONS.slice(0, 6)

  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow background (Fleety-style ember arcs). */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="editable-drift absolute -right-[15%] -top-[30%] h-[760px] w-[760px] rounded-full bg-[radial-gradient(circle,rgba(255,94,43,0.34),transparent_62%)] blur-[40px]" />
        <div className="absolute right-[6%] top-[2%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,140,80,0.14),transparent_60%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[var(--slot4-page-bg)]" />
      </div>

      <div className={`relative ${container} pb-12 pt-20 sm:pt-24 lg:pb-16 lg:pt-32`}>
        <div className="max-w-3xl">
          <p className="editable-rise inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--slot4-accent)]" style={{ animationDelay: '40ms' }}>
            <Sparkles className="h-3.5 w-3.5" /> {hero.badge}
          </p>
          <h1 className="editable-display mt-7 text-5xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.6rem]">
            <span className="editable-rise block" style={{ animationDelay: '120ms' }}>
              {hero.titleLead} <span className="editable-accent-gradient">{hero.titleAccent}</span>
            </span>
            <span className="editable-rise block" style={{ animationDelay: '220ms' }}>
              {hero.titleTail}
            </span>
          </h1>
          <p className="editable-rise mt-7 max-w-xl text-lg leading-8 text-[var(--slot4-muted-text)]" style={{ animationDelay: '320ms' }}>
            {hero.description}
          </p>

          <div className="editable-rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '420ms' }}>
            <Link
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-16px_var(--slot4-accent-glow)] transition hover:brightness-110"
            >
              {hero.primaryCta.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          <form action="/search" className="editable-rise mt-8 flex w-full max-w-lg items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-2 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)]" style={{ animationDelay: '520ms' }}>
            <Search className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" />
            <input
              name="q"
              placeholder={hero.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
            <button className="shrink-0 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110">Search</button>
          </form>

          <div className="editable-rise mt-9" style={{ animationDelay: '600ms' }}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-soft-muted-text)]">{hero.trustLabel}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/article?category=${topic.slug}`}
                  className="rounded-full border border-[var(--editable-border)] px-4 py-1.5 text-xs font-medium text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-page-text)]"
                >
                  {topic.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Value props grid (editorial pillars). */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {hero.valueProps.map((prop, index) => (
            <div
              key={prop.title}
              data-reveal
              style={{ transitionDelay: `${index * 90}ms` }}
              className="group rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 transition duration-500 hover:-translate-y-1.5 hover:border-[var(--editable-border-strong)] hover:shadow-[0_30px_70px_-40px_var(--slot4-accent-glow)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--slot4-accent)]/30 bg-[color-mix(in_oklab,var(--slot4-accent)_12%,transparent)] text-sm font-bold text-[var(--slot4-accent)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="editable-display mt-5 text-lg font-semibold tracking-[-0.01em]">{prop.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{prop.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------- Topics / categories --------------------------- */
export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const copy = pagesContent.home.categories
  const topics = CATEGORY_OPTIONS.slice(0, 12)
  return (
    <section className="border-t border-[var(--editable-border)]">
      <div className={`${container} py-16 sm:py-20`}>
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} href={primaryRoute} cta="All topics" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {topics.map((topic, index) => (
            <Link
              key={topic.slug}
              href={`/article?category=${topic.slug}`}
              data-reveal
              style={{ transitionDelay: `${(index % 4) * 70}ms` }}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-5 transition duration-500 hover:-translate-y-1 hover:border-[var(--slot4-accent)]/50"
            >
              <span className="editable-display text-base font-semibold tracking-[-0.01em] text-[var(--slot4-page-text)]">{topic.name}</span>
              <ArrowUpRight className="h-4 w-4 text-[var(--slot4-soft-muted-text)] transition group-hover:translate-x-0.5 group-hover:text-[var(--slot4-accent)]" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------- Featured reading ----------------------------- */
export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  if (!pool.length) return null
  const lead = pool[0]
  const side = pool.slice(1, 5)
  const copy = pagesContent.home.featured

  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-warm)]">
      <div className={`${container} py-16 sm:py-20`}>
        <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} href={primaryRoute} cta="Browse all" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div data-reveal="zoom">
            <EditorialFeatureCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} />
          </div>
          <div className="grid gap-4">
            {side.map((post, index) => (
              <div key={post.id || post.slug} data-reveal="right" style={{ transitionDelay: `${index * 90}ms` }}>
                <CompactIndexCard post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------ Discovery: popular, stats, latest, voices ------------------ */
const sectionCopy: Record<string, { eyebrow: string; title: string; description: string }> = {
  spotlight: { eyebrow: pagesContent.home.latest.eyebrow, title: pagesContent.home.latest.title, description: pagesContent.home.latest.description },
  browse: { eyebrow: pagesContent.home.popular.eyebrow, title: pagesContent.home.popular.title, description: pagesContent.home.popular.description },
  index: { eyebrow: 'From the archive', title: 'Evergreen reads', description: 'Essays that hold up long after publication.' },
}

function StatsBand() {
  const stats = pagesContent.home.stats
  return (
    <section className="border-t border-[var(--editable-border)]">
      <div className={`${container} py-16 sm:py-20`}>
        <div className="text-center" data-reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{stats.eyebrow}</p>
          <h2 className="editable-display mt-4 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">{stats.title}</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {stats.items.map((item, index) => (
            <div
              key={item.label}
              data-reveal
              style={{ transitionDelay: `${index * 110}ms` }}
              className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-8 text-center transition duration-500 hover:border-[var(--editable-border-strong)]"
            >
              <p className="editable-display text-5xl font-semibold tracking-[-0.03em] sm:text-6xl">
                <span className="editable-accent-gradient">{item.value}</span>
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VoicesBand() {
  const voices = pagesContent.home.voices
  return (
    <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-warm)]">
      <div className={`${container} py-16 sm:py-20`}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div data-reveal="left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{voices.eyebrow}</p>
            <h2 className="editable-display mt-4 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl lg:text-5xl">{voices.title}</h2>
            <p className="mt-5 text-base leading-8 text-[var(--slot4-muted-text)]">{voices.description}</p>
          </div>
          <div className="grid gap-4" data-reveal="right">
            {voices.points.map((point, index) => (
              <div key={point} className="flex items-start gap-4 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5">
                <span className="editable-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--slot4-accent)]/30 text-sm font-semibold text-[var(--slot4-accent)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-[15px] leading-7 text-[var(--slot4-page-text)]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'browse', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'spotlight', posts: posts.slice(8, 16), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)

  return (
    <>
      {visible.slice(0, 1).map((section) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore', description: '' }
        return (
          <section key={section.key} className="border-t border-[var(--editable-border)]">
            <div className={`${container} py-16 sm:py-20`}>
              <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} href={section.href || primaryRoute} />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, index) => (
                  <div key={post.id || post.slug} data-reveal style={{ transitionDelay: `${(index % 4) * 80}ms` }}>
                    <FeedCard post={post} href={postHref(primaryTask, post, primaryRoute)} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <StatsBand />

      {visible.slice(1, 2).map((section) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore', description: '' }
        return (
          <section key={section.key} className="border-t border-[var(--editable-border)]">
            <div className={`${container} py-16 sm:py-20`}>
              <SectionHeader eyebrow={copy.eyebrow} title={copy.title} description={copy.description} href={section.href || primaryRoute} />
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, index) => (
                  <div key={post.id || post.slug} data-reveal style={{ transitionDelay: `${(index % 4) * 80}ms` }}>
                    <FeedCard post={post} href={postHref(primaryTask, post, primaryRoute)} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      <VoicesBand />
    </>
  )
}

/* -------------------------------- CTA band -------------------------------- */
export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section id="get-app" className="scroll-mt-24 border-t border-[var(--editable-border)]">
      <div className={`${container} py-20 sm:py-24`}>
        <div
          data-reveal="zoom"
          className="relative overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] px-7 py-16 text-center sm:px-12"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -right-[10%] -top-[40%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(255,94,43,0.3),transparent_62%)] blur-2xl" />
            <div className="absolute -bottom-[40%] left-[5%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(255,94,43,0.16),transparent_62%)] blur-2xl" />
          </div>
          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent-soft)]">{cta.badge}</p>
            <h2 className="editable-display mx-auto mt-5 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-white sm:text-5xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/70 sm:text-lg">{cta.description}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href={cta.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-16px_var(--slot4-accent-glow)] transition hover:brightness-110">
                {cta.primaryCta.label} <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href={cta.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
                {cta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
