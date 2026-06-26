'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'

/*
  Wraps page content so two premium motions replay on every navigation:

  1. `.editable-enter` — the page-open rise+fade (keyed remount per route).
  2. Scroll reveal — `data-reveal` elements fade/slide in as they enter view.

  Robustness contract:
  - The hidden state lives under `.reveal-enabled` (added client-side only). If
    JS never runs / hydration is interrupted, content stays fully visible — the
    animation can never hide content.
  - A MutationObserver re-scans for NEW `data-reveal` nodes, so content added
    after the initial pass (async auth/session state, streamed data, client
    navigation) is always revealed too. Each node is processed exactly once.
  - Anything in view is revealed immediately; off-screen items reveal on scroll;
    a failsafe reveals everything after a moment so nothing can get stuck.
*/
export function EditablePageMotion({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const reveal = (el: Element) => el.classList.add('is-visible')
    const processed = new WeakSet<Element>()

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    const supportsIO = typeof IntersectionObserver !== 'undefined'

    const io = supportsIO
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                reveal(entry.target)
                io?.unobserve(entry.target)
              }
            })
          },
          { rootMargin: '0px 0px -6% 0px', threshold: 0.04 }
        )
      : null

    // Process every not-yet-handled [data-reveal]: reveal if on screen now,
    // otherwise observe it (or reveal outright when IO is unavailable).
    const scan = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        if (processed.has(el)) return
        processed.add(el)
        if (prefersReduced || !io) {
          reveal(el)
          return
        }
        const rect = el.getBoundingClientRect()
        if (rect.top < vh * 0.95 && rect.bottom > -40) reveal(el)
        else io.observe(el)
      })
    }

    // Reveal in-view content BEFORE enabling the gated hidden state, so
    // above-the-fold content never flickers or disappears on first paint.
    scan()
    root.classList.add('reveal-enabled')

    // Catch content that mounts later (auth/session swaps, streamed lists).
    let raf = 0
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(scan)
    })
    mo.observe(root, { childList: true, subtree: true })

    // Failsafe: never leave anything hidden indefinitely.
    const failsafe = window.setTimeout(() => {
      root.querySelectorAll('[data-reveal]').forEach(reveal)
    }, 2500)

    return () => {
      io?.disconnect()
      mo.disconnect()
      cancelAnimationFrame(raf)
      window.clearTimeout(failsafe)
    }
  }, [pathname])

  return (
    <div ref={ref} key={pathname} className="editable-enter min-h-0 flex-1">
      {children}
    </div>
  )
}
