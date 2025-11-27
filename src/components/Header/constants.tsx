import { sendEventTracker } from '@/utils/analytics/tracker';

import { Logo } from './Logo';

export const navLinks = [
  {
    href: '/',
    'aria-label': "Siwakasen's personal blog",
    onClick: () => {
      sendEventTracker({
        name: 'click',
        category: 'header nav',
        label: 'logo',
      });
    },
    children: <Logo />,
  },
  {
    href: '/blog',
    'aria-label': 'blog',
    onClick: () => {
      sendEventTracker({
        name: 'click',
        category: 'header nav',
        label: 'blog',
      });
    },
    children: 'Blog',
  },
];
