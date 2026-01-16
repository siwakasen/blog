import { TODAY } from '@/lib/datetime';

import type { BaseEvent } from '../Timeline/TimelineEvent';

export const TIMELINE_START = new Date('2021-06-01');

export type JobHistoryEvent = BaseEvent & {
  details?: React.ReactNode;
};

export const timelineEvents = [
  // TODAY >= new Date('2025-01-15')
  //   ? {
  //       from: new Date('2025-01-15'),
  //       to: TODAY,
  //       title: 'Application Developer',
  //       description: 'PT Bank Central Asia Tbk | Intern',
  //       variant: 'blue',
  //       details: (
  //         <>
  //           <p>
  //             {' '}
  //             Not long after finishing my previous internship, I continued my
  //             next internship at BCA. At here, I helped revamp a full-stack web
  //             application by migrating it from legacy frameworks to Next.js,
  //             modernizing the tech stack for better performance,
  //             maintainability, and long-term relevance.
  //           </p>
  //           <p>
  //             I also learned to strengthened frontend web security by
  //             integrating encryption directly into the frontend workflow,
  //             ensuring sensitive data stayed protected during transmission.
  //           </p>
  //         </>
  //       ),
  //     }
  //   : null,
  {
    from: new Date('2025-01-15'),
    to: new Date('2025-01-14'),
    title: 'Application Developer',
    description: 'PT Bank Central Asia Tbk | Intern',
    variant: 'blue',
    details: (
      <>
        <p>
          {' '}
          Not long after finishing my previous internship, I continued my next
          internship at BCA. At here, I helped revamp a full-stack web
          application by migrating it from legacy frameworks to Next.js,
          modernizing the tech stack for better performance, maintainability,
          and long-term relevance.
        </p>
        <p>
          I also learned to strengthened frontend web security by integrating
          encryption directly into the frontend workflow, ensuring sensitive
          data stayed protected during transmission.
        </p>
      </>
    ),
  },
  {
    from: new Date('2024-08-01'),
    to: new Date('2025-01-04'),
    title: 'Web Developer',
    description: 'PT Winnicode Garuda Indonesia | Intern',
    variant: 'red',
    details: (
      <>
        <p>
          This was my first internship, where I had the chance to develop a
          recruitment app designed to streamline hiring and improve overall
          management efficiency.
        </p>
        <p>
          I built a RESTful API using Laravel with Inertia.js and PostgreSQL and
          deployed the app with Docker containers to support scalability and
          smooth deployment.
        </p>
        <p>
          It was a great experience that allowed me to work through the entire
          flow from development to production.
        </p>
      </>
    ),
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
        programming language, and learn building software. I also developed my
        skills in building connections, expanding my networking, and
        strengthening relationships with many people.
      </p>
    ),
  },
].filter(Boolean) as JobHistoryEvent[];
