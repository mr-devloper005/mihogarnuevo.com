'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogIn, LogOut, Menu, PenLine, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const NAV_LINKS = globalContent.nav.primaryLinks

function firstName(name?: string) {
  if (!name) return 'Member'
  return name.trim().split(/\s+/)[0] || 'Member'
}

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()

  // Sticky-navbar shrink on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled
          ? 'border-[var(--editable-border)] bg-[color-mix(in_oklab,var(--editable-nav-bg)_82%,transparent)] shadow-[0_18px_50px_-30px_rgba(0,0,0,0.9)]'
          : 'border-transparent bg-[color-mix(in_oklab,var(--editable-nav-bg)_55%,transparent)]'
      } text-[var(--editable-nav-text)]`}
    >
      <nav
        className={`mx-auto flex w-full max-w-[var(--editable-container)] items-center gap-5 px-5 sm:px-6 lg:px-8 ${
          scrolled ? 'min-h-[64px]' : 'min-h-[84px]'
        } transition-[min-height] duration-500`}
      >
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[var(--slot4-accent)]/40 bg-[var(--slot4-surface-bg)] transition duration-500 group-hover:border-[var(--slot4-accent)]">
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,var(--slot4-accent-glow),transparent_70%)] opacity-0 transition group-hover:opacity-100" />
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="relative h-9 w-9 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="editable-display block max-w-[220px] truncate text-lg font-semibold leading-none tracking-[-0.01em]">
              {SITE_CONFIG.name}
            </span>
            <span className="mt-1.5 block max-w-[220px] truncate text-[10px] font-medium uppercase tracking-[0.28em] text-[var(--slot4-soft-muted-text)]">
              {globalContent.nav.tagline}
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] transition ${
                  active ? 'text-[var(--slot4-page-text)]' : 'text-[var(--slot4-muted-text)] hover:text-[var(--slot4-page-text)]'
                }`}
              >
                {item.label}
                <span
                  className={`pointer-events-none absolute inset-x-4 bottom-1 h-[2px] origin-left bg-[var(--slot4-accent)] transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-3">
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-page-text)]"
          >
            <Search className="h-4 w-4" />
          </Link>

          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <PenLine className="h-3.5 w-3.5" /> Write
              </Link>
              <span className="hidden items-center gap-2 rounded-full bg-[var(--slot4-surface-bg)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-page-text)] sm:inline-flex">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--slot4-accent)] text-[10px] font-bold text-white">
                  {firstName(session.name).charAt(0).toUpperCase()}
                </span>
                {firstName(session.name)}
              </span>
              <button
                type="button"
                onClick={logout}
                aria-label="Log out"
                className="hidden items-center gap-2 rounded-full border border-[var(--editable-border)] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] transition hover:border-[var(--slot4-accent)]/50 hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogOut className="h-3.5 w-3.5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)] sm:inline-flex"
              >
                <LogIn className="h-3.5 w-3.5" /> Sign in
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_14px_36px_-14px_var(--slot4-accent-glow)] transition hover:brightness-110 sm:inline-flex"
              >
                <UserPlus className="h-3.5 w-3.5" /> Join
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-[var(--editable-nav-bg)] px-5 py-5 lg:hidden">
          <form action="/search" className="mb-5 flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-4 py-2.5">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input
              name="q"
              type="search"
              placeholder="Search essays"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
            />
          </form>
          <div className="grid gap-1">
            {[...NAV_LINKS, ...(session ? [{ label: 'Write', href: '/create' }] : [{ label: 'Sign in', href: '/login' }, { label: 'Join', href: '/signup' }])].map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl border-l-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition ${
                    active
                      ? 'border-[var(--slot4-accent)] bg-[var(--slot4-surface-bg)] text-[var(--slot4-page-text)]'
                      : 'border-transparent text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-surface-bg)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button
                type="button"
                onClick={() => {
                  logout()
                  setOpen(false)
                }}
                className="rounded-xl border-l-2 border-transparent px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.14em] text-[var(--slot4-muted-text)] transition hover:bg-[var(--slot4-surface-bg)]"
              >
                Logout · {firstName(session.name)}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
