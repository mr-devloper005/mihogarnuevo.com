import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Bookmark, PenLine } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Create account', description: pagesContent.auth.signup.metadataDescription })
}

const perks = [
  { icon: BookOpen, label: 'Read everything, distraction-free' },
  { icon: Bookmark, label: 'Save essays and follow topics' },
  { icon: PenLine, label: 'Open the writing workspace' },
]

export default function SignupPage() {
  const copy = pagesContent.auth.signup
  return (
    <EditableSiteShell>
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-[var(--editable-container)] items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div data-reveal="left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{copy.badge}</p>
            <h1 className="editable-display mt-4 text-4xl font-semibold leading-[1.06] tracking-[-0.02em] sm:text-5xl">{copy.title}</h1>
            <p className="mt-4 max-w-md text-base leading-7 text-[var(--slot4-muted-text)]">{copy.description}</p>
            <div className="mt-8 grid gap-3">
              {perks.map((perk) => (
                <div key={perk.label} className="flex items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--slot4-accent)]/30 bg-[color-mix(in_oklab,var(--slot4-accent)_12%,transparent)] text-[var(--slot4-accent)]">
                    <perk.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-[var(--slot4-page-text)]">{perk.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-9" data-reveal="right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{SITE_CONFIG.name}</p>
            <h2 className="editable-display mt-2 text-2xl font-semibold tracking-[-0.01em]">{copy.formTitle}</h2>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
              Already have an account? <Link href="/login" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{copy.loginCta}</Link>
            </p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
