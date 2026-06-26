'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail, Send } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const footer = globalContent.footer

  return (
    <footer className="relative overflow-hidden border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="pointer-events-none absolute -top-40 right-[-10%] h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--slot4-accent-glow),transparent_70%)] blur-3xl" />

      {/* Newsletter / CTA band */}
      <div className="relative border-b border-[var(--editable-border)]">
        <div className="mx-auto grid w-full max-w-[var(--editable-container)] gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-8" data-reveal="fade">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]">{footer.tagline}</p>
            <h2 className="editable-display mt-4 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{footer.newsletter.title}</h2>
            <p className="mt-3 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{footer.newsletter.description}</p>
          </div>
          <form action="/contact" className="flex w-full flex-col gap-3 sm:flex-row lg:justify-self-end">
            <label className="flex flex-1 items-center gap-2.5 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-5 py-3.5 transition focus-within:border-[var(--slot4-accent)]">
              <Mail className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
              <input
                name="email"
                type="email"
                required
                placeholder={footer.newsletter.placeholder}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
              />
            </label>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_-14px_var(--slot4-accent-glow)] transition hover:brightness-110">
              {footer.newsletter.cta} <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[var(--editable-container)] gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--slot4-accent)]/40 bg-[var(--slot4-surface-bg)] transition duration-500 group-hover:border-[var(--slot4-accent)]">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--slot4-accent-glow),transparent_70%)] opacity-0 transition group-hover:opacity-100" />
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="relative h-9 w-9 object-contain" />
            </span>
            <span className="editable-display block max-w-[100px] truncate text-lg font-semibold leading-none tracking-[-0.01em]">
              {SITE_CONFIG.name}
            </span>

          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--slot4-muted-text)]">{footer.description}</p>
          <a
            href={`mailto:hello@${SITE_CONFIG.domain}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]"
          >
            
          </a>
        </div>

        {footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--slot4-accent)]">{column.title}</h3>
            <div className="mt-5 grid gap-3">
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
                </Link>
              ))}
              {column.title === 'Connect' && session ? (
                <button
                  type="button"
                  onClick={logout}
                  className="w-fit text-left text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]"
                >
                  Log out
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-[var(--editable-border)]">
        <div className="mx-auto flex w-full max-w-[var(--editable-container)] flex-col items-center justify-between gap-3 px-5 py-6 text-center text-xs font-medium text-[var(--slot4-soft-muted-text)] sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <span>© {year} {SITE_CONFIG.name}. All rights reserved.</span>
          <span>{footer.bottomNote}</span>
        </div>
      </div>
    </footer>
  )
}
