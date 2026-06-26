import type { CSSProperties } from 'react'

export const editableRootStyle = {
  // Premium dark editorial system (Fleety-inspired): near-black canvas, warm
  // ember-orange accent, hairline white borders, soft orange glow. Spacious,
  // high-contrast, built for a modern publishing / author platform.
  '--slot4-page-bg': '#08080a',
  '--slot4-page-text': '#f5f5f4',
  '--slot4-panel-bg': '#101013',
  '--slot4-surface-bg': '#141417',
  '--slot4-muted-text': '#a7a7ad',
  '--slot4-soft-muted-text': '#76767d',
  '--slot4-accent': '#ff5e2b',
  '--slot4-accent-fill': '#ff5e2b',
  '--slot4-accent-soft': '#ffc6ac',
  '--slot4-accent-glow': 'rgba(255,94,43,0.22)',
  '--slot4-on-accent': '#ffffff',
  '--slot4-dark-bg': '#0c0c0f',
  '--slot4-dark-text': '#f5f5f4',
  '--slot4-media-bg': '#1b1b1f',
  '--slot4-cream': '#0c0c0f',
  '--slot4-warm': '#0b0b0d',
  '--slot4-lavender': '#101013',
  '--slot4-gray': '#101013',
  '--slot4-body-gradient':
    'radial-gradient(1200px 620px at 78% -8%, rgba(255,94,43,0.12), transparent 58%), radial-gradient(900px 520px at 8% 4%, rgba(255,94,43,0.05), transparent 60%)',
  '--editable-page-bg': '#08080a',
  '--editable-page-text': '#f5f5f4',
  '--editable-container': '1240px',
  '--editable-border': 'rgba(255,255,255,0.09)',
  '--editable-border-strong': 'rgba(255,255,255,0.16)',
  '--editable-nav-bg': '#08080a',
  '--editable-nav-text': '#f5f5f4',
  '--editable-nav-active': '#ff5e2b',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#ff5e2b',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#141417',
  '--editable-footer-bg': '#08080a',
  '--editable-footer-text': '#f5f5f4',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[color-mix(in_oklab,var(--slot4-accent)_16%,transparent)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/10',
  shadow: 'shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_40px_-24px_rgba(0,0,0,0.8)]',
  shadowStrong: 'shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(8,8,10,0.05),rgba(8,8,10,0.86))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8',
    sectionY: 'py-16 sm:py-20 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[150px] shrink-0 snap-start sm:w-[170px]',
  },
  type: {
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--slot4-accent)]',
    heroTitle: 'text-5xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.025em] sm:text-4xl lg:text-5xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-2xl border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-2xl border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-2xl border ${editablePalette.border} ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-on-accent)] shadow-[0_14px_40px_-12px_var(--slot4-accent-glow)] transition duration-300 hover:shadow-[0_18px_50px_-10px_var(--slot4-accent-glow)] hover:brightness-110 active:scale-[0.98]',
    secondary:
      'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border-strong)] bg-transparent px-7 py-3 text-sm font-semibold tracking-[0.01em] text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] active:scale-[0.98]',
    accent:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-7 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:brightness-110 active:scale-[0.98]',
  },
  media: {
    frame: `relative overflow-hidden rounded-2xl ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-500 hover:-translate-y-1.5 hover:border-[var(--editable-border-strong)] hover:shadow-[0_30px_70px_-30px_var(--slot4-accent-glow)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'Change the full site color palette in editableRootStyle first; all sections consume those CSS variables.',
  'Keep page structure in src/editable/sections/HomeSections.tsx so the whole home experience is editable in one file.',
  'Use contained, readable widths (var(--editable-container)); never let paragraphs or cards stretch edge to edge.',
  'Use the [data-reveal] attribute for scroll-in animations; the page motion shell observes and reveals them.',
  'Keep dynamic post fetching intact; do not replace real posts with mock arrays.',
  'Use postHref() for all post links so task-specific routes keep working.',
] as const
