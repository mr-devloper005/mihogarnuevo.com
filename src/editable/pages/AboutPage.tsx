import Link from 'next/link'
import { ArrowUpRight, BookOpen, PenLine, Users } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const valueIcons = [BookOpen, PenLine, Users]

export default function AboutPage() {
  const about = pagesContent.about
  const stats = pagesContent.home.stats.items
  const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

  return (
    <EditableSiteShell>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--editable-border)]">
          <div className="pointer-events-none absolute -right-[12%] -top-[34%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,var(--slot4-accent-glow),transparent_62%)] blur-3xl" />
          <div className={`relative ${container} py-20 sm:py-28`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]" data-reveal="fade">{about.badge}</p>
            <h1 className="editable-display mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl" data-reveal>
              About <span className="editable-accent-gradient">{SITE_CONFIG.name}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]" data-reveal style={{ transitionDelay: '80ms' }}>{about.title}</p>
          </div>
        </section>

        {/* Story + stats */}
        <section className={`${container} py-16 sm:py-20`}>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
            <div className="space-y-6" data-reveal="left">
              <p className="text-base leading-8 text-[var(--slot4-muted-text)]">{about.description}</p>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-[var(--slot4-muted-text)]">{paragraph}</p>
              ))}
            </div>
            <div className="grid gap-4" data-reveal="right">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6">
                  <p className="editable-display text-4xl font-semibold tracking-[-0.03em]"><span className="editable-accent-gradient">{item.value}</span></p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-[var(--editable-border)] bg-[var(--slot4-warm)]">
          <div className={`${container} py-16 sm:py-20`}>
            <h2 className="editable-display text-3xl font-semibold tracking-[-0.025em] sm:text-4xl" data-reveal>What we stand for</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {about.values.map((value, index) => {
                const Icon = valueIcons[index] || BookOpen
                return (
                  <div
                    key={value.title}
                    data-reveal
                    style={{ transitionDelay: `${index * 100}ms` }}
                    className="rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 transition duration-500 hover:-translate-y-1.5 hover:border-[var(--editable-border-strong)]"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--slot4-accent)]/30 bg-[color-mix(in_oklab,var(--slot4-accent)_12%,transparent)] text-[var(--slot4-accent)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="editable-display mt-5 text-xl font-semibold tracking-[-0.01em]">{value.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`${container} py-20`}>
          <div className="flex flex-col items-center gap-6 rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-7 py-14 text-center" data-reveal="zoom">
            <h2 className="editable-display max-w-2xl text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">Start reading, or start writing.</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/search" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_18px_50px_-16px_var(--slot4-accent-glow)] transition hover:brightness-110">
                Explore the archive <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
                Talk to the editors
              </Link>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
