import type { Metadata } from 'next'
import Link from 'next/link'
import { Quote } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { SITE_CONFIG } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Sign in', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  const copy = pagesContent.auth.login
  return (
    <EditableSiteShell>
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-9rem)] w-full max-w-[var(--editable-container)] items-center gap-12 px-5 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="relative hidden overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] p-10 lg:flex lg:min-h-[560px] lg:flex-col lg:justify-between" data-reveal="left">
            <div className="pointer-events-none absolute -right-[20%] -top-[20%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(255,94,43,0.3),transparent_62%)] blur-2xl" />
            <p className="relative text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent-soft)]">{SITE_CONFIG.name}</p>
            <div className="relative">
              <Quote className="h-9 w-9 text-[var(--slot4-accent)]" />
              <p className="editable-serif mt-5 text-2xl leading-relaxed text-white sm:text-3xl">
                A good essay rewards the reader who slows down. We built this place for exactly that.
              </p>
              <p className="mt-6 text-sm font-medium uppercase tracking-[0.18em] text-white/60">The Editorial Desk</p>
            </div>
          </div>

          <div data-reveal="right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{copy.badge}</p>
            <h1 className="editable-display mt-4 text-4xl font-semibold leading-[1.06] tracking-[-0.02em] sm:text-5xl">{copy.title}</h1>
            <p className="mt-4 max-w-md text-base leading-7 text-[var(--slot4-muted-text)]">{copy.description}</p>
            <div className="mt-8 rounded-[1.5rem] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 sm:p-8">
              <h2 className="editable-display text-xl font-semibold tracking-[-0.01em]">{copy.formTitle}</h2>
              <EditableLocalLoginForm />
              <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">
                New here? <Link href="/signup" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{copy.createCta}</Link>
              </p>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
