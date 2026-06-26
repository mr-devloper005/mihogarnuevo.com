import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

/*
  Premium dark editorial task surfaces.

  Every task (archive + detail) shares one cohesive identity: a near-black
  canvas, the warm ember-orange accent, hairline white borders and a clean
  geometric grotesk. Per-task copy (kicker / note) keeps a little voice while
  the visual language stays unified. Tokens ship as CSS variables (`--tk-*`).
*/

export type TaskTheme = {
  /** short flavour word shown as an eyebrow kicker */
  kicker: string
  /** one-line mood note for the page intro */
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Space Grotesk', 'Syne', system-ui, -apple-system, sans-serif"
const BODY_FONT = "'Inter', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"

// Shared dark editorial palette — every task inherits this; only kicker/note differ.
const base = {
  dark: true,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#08080a',
  surface: '#141417',
  raised: '#1b1b1f',
  text: '#f5f5f4',
  muted: '#a7a7ad',
  line: 'rgba(255,255,255,0.09)',
  accent: '#ff5e2b',
  accentSoft: 'rgba(255,94,43,0.14)',
  onAccent: '#ffffff',
  glow: 'rgba(255,94,43,0.16)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Editorial', note: 'In-depth essays, guides and ideas worth your time.' },
  listing: { ...base, kicker: 'Directory', note: 'Find, compare and connect with what you need.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Fresh offers and notices, ready to act on.' },
  image: { ...base, kicker: 'Visuals', note: 'A curated feed of standout images and galleries.' },
  sbm: { ...base, kicker: 'Collections', note: 'Curated resources and links worth saving.' },
  pdf: { ...base, kicker: 'Library', note: 'Downloadable guides, reports and references.' },
  profile: { ...base, kicker: 'Contributors', note: 'The writers and voices behind the work.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

/** All `--tk-*` tokens + font overrides for a task surface, ready for `style`. */
export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    // Re-point the shared article-body accent vars so post HTML (headings,
    // links) inherits this task's accent instead of the global site accent.
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
