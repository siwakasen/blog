// import { TODAY } from '@/lib/datetime';

import type { BaseEvent } from '../Timeline/TimelineEvent';

export const TIMELINE_START = new Date('2021-06-01');
const TODAY = new Date();

export type JobHistoryEvent = BaseEvent & {
  details?: React.ReactNode;
};

export const timelineEvents = [
  TODAY >= new Date('2026-06-02')
    ? {
        from: new Date('2026-06-02'),
        to: TODAY,
        title: 'Full-Stack Developer',
        description: 'PT Fortech Indotama | Full-time',
        variant: 'amber',
        details: (
          <>
            <p>
              I currently work as a Full-Stack Developer at PT Fortech Indotama,
              contributing to the development and maintenance of web
              applications across the frontend, backend, devops and some AI
              implementations.
            </p>
            <p>
              I collaborate with the team to translate business requirements
              into reliable features, troubleshoot issues, and improve existing
              systems.
            </p>
          </>
        ),
      }
    : null,
  {
    from: new Date('2026-02-15'),
    to: new Date('2026-05-31'),
    title: 'DevOps & Software Engineer',
    description: 'Freelance',
    variant: 'green',
    details: (
      <>
        <p>
          After completing my internship, I worked as a freelance DevOps
          Engineer, building and maintaining production environments. I also
          worked as a freelance Software Engineer, developing the website for
          Sekolah Tadika Prima, a preschool.
        </p>
        <p>
          In my spare time, I explored new projects using Python and began
          learning Go.
        </p>
      </>
    ),
  },
  {
    from: new Date('2025-01-15'),
    to: new Date('2026-01-14'),
    title: 'Application Developer',
    description: 'PT Bank Central Asia Tbk | Intern',
    variant: 'sky',
    details: (
      <>
        <p>
          Shortly after completing my previous internship, I began another
          internship at BCA. There, I helped revamp a full-stack web application
          by migrating it from legacy frameworks to modern frameworks, improving
          its performance, maintainability, and long-term relevance.
        </p>
        <p>
          I also strengthened frontend security by integrating encryption into
          the frontend workflow, helping protect sensitive data during
          transmission.
        </p>
      </>
    ),
  },
  {
    from: new Date('2024-08-01'),
    to: new Date('2024-12-31'),
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
          I built a RESTful API using Laravel, Inertia.js, and PostgreSQL, then
          deployed the application in Docker containers to support scalability
          and streamline deployment.
        </p>
        <p>
          This experience allowed me to work across the entire delivery
          lifecycle, from development to production.
        </p>
      </>
    ),
  },
  {
    from: new Date('2021-08-01'),
    to: new Date('2025-11-29'),
    title: '🎓 Computer Science Student',
    description: 'Universitas Atma Jaya Yogyakarta',
    variant: 'violet',
    details: (
      <p>
        I studied a broad range of technologies, including how computers work,
        programming languages, and software development. I also strengthened my
        interpersonal skills by building connections, expanding my professional
        network, and developing meaningful relationships.
      </p>
    ),
  },
].filter(Boolean) as JobHistoryEvent[];
