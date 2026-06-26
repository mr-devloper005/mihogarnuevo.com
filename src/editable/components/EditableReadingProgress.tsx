'use client'

import { useEffect, useState } from 'react'

/*
  Fixed top reading-progress bar for the article reading experience.
  Tracks scroll position against full document height and drives the
  `--read` CSS variable (0 → 1) consumed by `.editable-reading-progress`.
  Renders nothing for prefers-reduced-motion users to stay calm.
*/
export function EditableReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className="editable-reading-progress"
      style={{ ['--read' as string]: String(progress) }}
      aria-hidden="true"
    />
  )
}
