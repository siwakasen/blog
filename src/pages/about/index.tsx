import ProjectsList from '@/components/Projects/List';
import { PageMetaTags } from '@/components/Seo/PageMetaTags';
import { HorizontalDivider } from '@/components/Divider';
import GitHubList from '@/components/GitHub/List';
import MediumList from '@/components/Medium/List';
import { Code } from '@/components/Typography/Code';
import { ExternalLink } from '@/components/Typography/ExternalLink';
import { PageTitle } from '@/components/Typography/PageTitle';
import { Paragraph } from '@/components/Typography/Paragraph';
import { SectionTitle } from '@/components/Typography/SectionTitle';
import { EmojiSpan } from '@/components/Typography/EmojiSpan';
import { HistoryCalendar } from '@/components/HistoryCalendar';
import { TechnologyAnchors } from '@/components/TechnologyAnchors';
import { cn } from '@/utils/styles/classNames';
import { Mark } from '@/components/common/Mark';

export default function About() {
  return (
    <>
      <PageMetaTags />
      <PageTitle>
        About me <EmojiSpan>👨‍💻</EmojiSpan>
      </PageTitle>
      <Paragraph>
        I am a tech enthusiast passionate about Linux and managing
        infrastructure. I love homelabbing and self-hosting services to explore
        how systems work hands-on. There's something incredibly satisfying about
        building and maintaining your own infrastructure—it's where I get to
        experiment, learn, and truly understand technology from the ground up.
      </Paragraph>

      <Paragraph>
        I also enjoy software engineering, building various projects to deliver
        digital solutions. Whether it's crafting applications or configuring
        servers, I'm driven by curiosity and the challenge of creating things
        that work well. My diverse interests across development and
        infrastructure give me a well-rounded perspective on how technology
        comes together.
      </Paragraph>

      <HorizontalDivider />

      <div className="my-12">
        <HistoryCalendar />
      </div>

      <SectionTitle>Recent Projects 📋</SectionTitle>
      <ProjectsList />
      <HorizontalDivider />

      <SectionTitle>Professional summary 💼</SectionTitle>

      <Paragraph>
        I am currently finishing my internship and starting to look for a job,
        especially in DevOps, Sysadmin, or Software Engineering. I play around
        with <TechnologyAnchors /> on daily basis.
      </Paragraph>
      <Paragraph>
        During my internships, I worked on modernizing a full-stack web
        application by migrating it to{' '}
        <ExternalLink href="https://nextjs.org/" shouldShowPreviewOnHover>
          Next.js
        </ExternalLink>{' '}
        and improving frontend structure, performance, and reliability. I also
        implemented encryption on the frontend to enhance data protection. In
        another project, I built a recruitment platform using{' '}
        <ExternalLink href="https://laravel.com/" shouldShowPreviewOnHover>
          Laravel
        </ExternalLink>{' '}
        with{' '}
        <ExternalLink href="https://inertiajs.com/" shouldShowPreviewOnHover>
          Inertia.js
        </ExternalLink>
        ,{' '}
        <ExternalLink
          href="https://www.typescriptlang.org/"
          shouldShowPreviewOnHover
        >
          TypeScript
        </ExternalLink>
        , and{' '}
        <ExternalLink
          href="https://www.postgresql.org/"
          shouldShowPreviewOnHover
        >
          PostgreSQL
        </ExternalLink>
        .
      </Paragraph>

      {/* <HorizontalDivider />
      <SectionTitle>I write, kinda ✍️</SectionTitle>
      <div
        className={cn(
          'flex flex-col lg:flex-row justify-between gap-0 lg:gap-16',
        )}
      >
        <div className="flex-1 lg:max-w-[47%]">
          <Paragraph>
            I have always been a curious person. I love to learn things and
            understand how they work. Sometimes if I find the discovery
            interesting, I try to write an article about them to share them!
          </Paragraph>
          <Paragraph>
            I had mostly been writing on{' '}
            <ExternalLink href="https://medium.com/@jackyef">
              Medium
            </ExternalLink>
            , but I have been trying to start writing on my own blog. If you are
            reading this right now, hopefully I have already published some
            writings on this site by then!
          </Paragraph>
          <Paragraph className="mb-0">
            Here are some of my writings on Medium.
          </Paragraph>
        </div>
        <div className="flex-1 lg:max-w-[47%]">
          <MediumList />
        </div>
      </div> */}

      <HorizontalDivider />
      <SectionTitle>I build stuff 🛠️</SectionTitle>

      <div
        className={cn(
          'flex flex-col lg:flex-row-reverse justify-between gap-0 lg:gap-16',
        )}
      >
        <div className="flex-1 lg:max-w-[47%]">
          <Paragraph className="mb-0">
            Currently, I’m still learning new things and trying to build stuff
            that might be useful. I’ve published some of them on{' '}
            <ExternalLink
              shouldShowPreviewOnHover
              href="https://github.com/siwakasen"
            >
              GitHub
            </ExternalLink>
            . And I’m <Mark>open to contributing to interesting projects</Mark>.
            You can reach me by{' '}
            <ExternalLink href="mailto:siwakasen@gmail.com">email</ExternalLink>{' '}
            anytime.
          </Paragraph>
        </div>
        <div className="flex-1 lg:max-w-[47%]">
          <GitHubList />
        </div>
      </div>
      <HorizontalDivider />

      {/* <SectionTitle>I speak too, sometimes 🎤</SectionTitle>
      <Paragraph>
        During the course of my career, I have been fortunate enough to be given
        some opportunities to give talks about web development and its
        ecosystem, both for internal and external audience. In 2020, I gave 5
        internal talks at Tokopedia and 2 external talks representing Tokopedia
        at{' '}
        <ExternalLink href="https://start-summit.com/schedule/">
          START Summit
        </ExternalLink>{' '}
        and{' '}
        <ExternalLink href="https://developersonair.withgoogle.com/events/partnersforumid">
          web.dev partners forum
        </ExternalLink>
        .
      </Paragraph>
      <Paragraph>
        In the future, I am hoping to be more active in the community, giving
        more talks about the web. Who knows, I might add a <Code>/talk</Code>{' '}
        page on this site with the materials if it turns out to be a good idea!
      </Paragraph>
      <HorizontalDivider /> */}
    </>
  );
}
