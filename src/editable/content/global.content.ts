import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent publishing platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Ideas, essays & expert voices',
    // Public navigation only — no profile or article-archive entries.
    primaryLinks: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Search', href: '/search' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Start reading', href: '/' },
      secondary: { label: 'Contact', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Where ideas find their readers',    
    description:
      'A dedicated platform for in-depth essays, expert insights, and worthwhile ideas. Here, we prioritize thoughtful reading and deep exploration over speed and superficial engagement. Let\'s discover together.',
    // Curated public columns only — no profile or article-archive navigation links.
    columns: [
      {
        title: 'Explore',
        links: [
          { label: 'Home', href: '/' },
          { label: 'Search the archive', href: '/search' },
          { label: 'About the platform', href: '/about' },
        ],
      },
      {
        title: 'Connect',
        links: [
          { label: 'Contact the desk', href: '/contact' },
          { label: 'Member sign in', href: '/login' },
          { label: 'Create an account', href: '/signup' },
        ],
      },
    ],
    newsletter: {
      title: 'The weekly dispatch',
      description: 'A short edit of our best new essays and ideas, delivered once a week. No noise.',
      placeholder: 'you@example.com',
      cta: 'Subscribe',
    },
    bottomNote: 'Crafted for considered reading and thoughtful discovery.',
  },
  commonLabels: {
    readMore: 'Read the essay',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Keep reading',
    published: 'Published',
  },
} as const
