import { TODAY } from '@/lib/datetime';

import type { BaseEvent } from '../Timeline/TimelineEvent';
import { TechnologyAnchors } from '../TechnologyAnchors';
import { ExternalLink } from '../Typography/ExternalLink';

import { ExternalMedia, ExternalMediaList } from './components/ExternalMedia';
import { UnorderedList } from './components/UnorderedList';

export const TIMELINE_START = new Date('2021-06-01');

export type JobHistoryEvent = BaseEvent & {
  details?: React.ReactNode;
};

export const timelineEvents = [
  TODAY >= new Date('2025-01-15')
    ? {
        from: new Date('2025-01-15'),
        to: TODAY,
        title: 'Application Developer',
        description: 'PT Bank Central Asia Tbk | Intern',
        variant: 'blue',
        details: (
          <>
            <p>
              After having a taste of a Tech Lead role for almost 2 years, I am
              now back to being an individual contributor (IC) again! It has
              been a nice experience, but I missed being an IC, so I took the
              opportunity to step down amidst a reorg.
            </p>

            <p>
              One of the first projects I would be involved in will be a
              cross-company design system update; hopefully I would learn much
              and thus have things to share in coming days!
            </p>
          </>
        ),
      }
    : null,

  {
    from: new Date('2024-08-01'),
    to: new Date('2025-01-04'),
    title: 'Web Developer',
    description: 'PT Winnicode Garuda Indonesia | Intern',
    variant: 'red',
    details: <p></p>,
  },
  {
    from: new Date('2021-08-01'),
    to: new Date('2025-11-29'),
    title: '🎓 Computer Science Student',
    description: 'Atma Jaya Yogyakarta University',
    variant: 'amber',
    details: (
      <p>
        I learned a lot about technology, including how computers work,
        different levels of programming, and learn using Linux. I also developed
        my skills in building connections, expanding my networking, and
        strengthening relationships with many people.
      </p>
    ),
  },
].filter(Boolean) as JobHistoryEvent[];
