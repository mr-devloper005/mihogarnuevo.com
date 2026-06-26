import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Essays, ideas, and expert voices',
      description:
        'A premium editorial platform for long-form essays, expert commentary, and ideas worth sharing across every topic that matters.',
      openGraphTitle: 'Essays, ideas, and expert voices',
      openGraphDescription:
        'Read long-form essays and expert commentary from independent writers on a calmer, reading-first publishing platform.',
      keywords: ['editorial platform', 'essays', 'thought leadership', 'long-form articles', 'expert writers'],
    },
    hero: {
      badge: 'Independent editorial platform',
      title: ['Ideas worth reading,', 'from voices worth following.'],
      titleLead: 'Ideas worth',
      titleAccent: 'reading',
      titleTail: 'from voices worth following.',
      description:
        'Long-form essays, sharp commentary, and original thinking from independent writers — published to be read closely, not scrolled past.',
      primaryCta: { label: 'Start reading', href: '/article' },
      secondaryCta: { label: 'Search the archive', href: '/search' },
      searchPlaceholder: 'Search essays, topics, and ideas…',
      trustLabel: 'Read by curious minds at',
      valueProps: [
        { title: 'In-Depth Essays', description: 'Considered, well-argued writing with room to breathe.' },
        { title: 'Expert Voices', description: 'Perspectives from people who know the subject deeply.' },
        { title: 'Curated Topics', description: 'Editorial threads that connect ideas across fields.' },
        { title: 'Reading-First Design', description: 'Built for focus, clarity, and the long read.' },
      ],
    },
    intro: {
      paragraphs: [
        'We publish long-form essays and considered commentary from independent writers — work that respects the reader enough to make a real argument.',
        'Every piece is edited for clarity and given the space a genuine idea deserves, so one good read leads naturally to the next.',
      ],
    },
    featured: {
      eyebrow: 'Editorial highlights',
      title: 'Featured reading',
      description: 'Selected essays and ideas our editors keep returning to.',
    },
    categories: {
      eyebrow: 'Browse by interest',
      title: 'Explore the topics',
      description: 'Follow the threads that connect our writing across every field.',
    },
    popular: {
      eyebrow: 'Most read',
      title: 'Popular this month',
      description: 'The essays readers are sharing, saving, and returning to.',
    },
    latest: {
      eyebrow: 'Fresh off the desk',
      title: 'Latest essays',
      description: 'New writing, published as the ideas arrive.',
    },
    stats: {
      eyebrow: 'The platform in numbers',
      title: 'Built for serious reading',
      items: [
        { value: '1.2K+', label: 'Essays published' },
        { value: '180+', label: 'Contributing writers' },
        { value: '40+', label: 'Topics covered' },
      ],
    },
    voices: {
      eyebrow: 'The editorial voice',
      title: 'Writing that respects the reader',
      description:
        'Every piece is edited for clarity, argued in good faith, and given the space a real idea deserves. No filler, no churn — just considered work from people who care about getting it right.',
      points: [
        'Original essays and reported commentary, never recycled feeds.',
        'A reading experience tuned for focus and long-form depth.',
        'Topics that connect, so one good read leads to the next.',
      ],
    },
    cta: {
      badge: 'Join the conversation',
      title: 'Have an idea worth publishing?',
      description:
        'Bring your essay, your argument, or your perspective. Create an account and start writing for a platform built around the reader.',
      primaryCta: { label: 'Start writing', href: '/create' },
      secondaryCta: { label: 'Talk to the editors', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest writing in this collection.',
    },
  },
  about: {
    badge: 'Our story',
    title: 'A calmer home for ideas worth reading.',
    description: `${slot4BrandConfig.siteName} is an independent editorial platform built to give long-form writing the focus, space, and craft it deserves.`,
    paragraphs: [
      'We started with a simple frustration: the best ideas were being squeezed into formats that rewarded speed over substance. So we built a place that does the opposite — one that treats reading as something to be enjoyed, not rushed.',
      'Every essay here is edited with care, designed for clarity, and connected to the wider conversation around it. Whether you arrive for a single piece or stay to follow a thread, the experience is meant to feel considered from the first line to the last.',
    ],
    values: [
      {
        title: 'Reading-first by design',
        description: 'Clarity, pacing, and typography come first, so ideas land the way the writer intended.',
      },
      {
        title: 'Voices over volume',
        description: 'We publish fewer, better pieces from writers with something genuine to say.',
      },
      {
        title: 'Ideas that connect',
        description: 'Topics and essays link together, turning one good read into a richer trail of discovery.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Pitch an essay, ask a question, or start a conversation.',
    description:
      'Whether you want to contribute writing, suggest a topic, or talk about a collaboration, tell us what you have in mind and we will route it to the right editor.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search essays, topics, and ideas across the editorial archive.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find the essay you are looking for.',
      description: 'Search by keyword, topic, or author idea to surface writing from across the entire archive.',
      placeholder: 'Search by keyword, topic, or title',
    },
    resultsTitle: 'From the archive',
  },
  create: {
    metadata: {
      title: 'Write',
      description: 'Draft and submit new writing for the platform.',
    },
    locked: {
      badge: 'Writer access',
      title: 'Sign in to start writing.',
      description: 'Use your account to open the editorial workspace and draft essays, commentary, and ideas for the platform.',
    },
    hero: {
      badge: 'Editorial workspace',
      title: 'Draft your next essay.',
      description: 'Choose a format, shape your argument, and prepare a clean piece with a title, summary, imagery, and body.',
    },
    formTitle: 'Draft details',
    submitLabel: 'Submit draft',
    successTitle: 'Draft submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Sign in to your account.',
      badge: 'Member access',
      title: 'Welcome back to the reading room.',
      description: 'Sign in to continue reading, save essays, and pick up your drafts where you left off.',
      formTitle: 'Sign in',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then sign in.',
      success: 'Signed in. Redirecting…',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Create your account.',
      badge: 'Join the platform',
      title: 'Create your account and start reading.',
      description: 'Create an account to save essays, follow topics, and open the editorial workspace to write your own.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created. Redirecting…',
      loginCta: 'Sign in',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Keep reading',
      fallbackTitle: 'Essay',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'More essays',
      fallbackDescription: 'Contributor details will appear here once available.',
      visitButton: 'Visit website',
    },
  },
} as const
