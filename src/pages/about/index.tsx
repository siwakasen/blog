import ProjectsList from '@/components/Projects/List';
import { PageMetaTags } from '@/components/Seo/PageMetaTags';
import { HorizontalDivider } from '@/components/Divider';
import GitHubList from '@/components/GitHub/List';
import { ExternalLink } from '@/components/Typography/ExternalLink';
import { PageTitle } from '@/components/Typography/PageTitle';
import { Paragraph } from '@/components/Typography/Paragraph';
import { SectionTitle } from '@/components/Typography/SectionTitle';
import { EmojiSpan } from '@/components/Typography/EmojiSpan';
import { HistoryCalendar } from '@/components/HistoryCalendar';
import { TechnologyAnchors } from '@/components/TechnologyAnchors';
import { Mark } from '@/components/common/Mark';
import { cn } from '@/utils/styles/classNames';

export default function About() {
  return (
    <>
      <PageMetaTags />
      <PageTitle>
        About me <EmojiSpan>🐧</EmojiSpan>
      </PageTitle>
      <Paragraph>
        I am a software engineer passionate about Linux. I do homelabbing and self-hosting services to explore
        how systems work hands-on. Theres something incredibly satisfying about
        building and maintaining your own infrastructure—it’s where I get to
        experiment, learn, and truly understand technology from the ground up.
      </Paragraph>

      <Paragraph>
        I also enjoy building apps and developing various projects from
        backend to frontend to deliver digital solutions. Whether it’s
        crafting applications or configuring servers, I’m driven by
        curiosity and the challenge of creating things that work well.
        My diverse interests across development and infrastructure give
        me a well-rounded perspective on how technology comes together.
      </Paragraph>

      <HorizontalDivider />

      <div className="my-12">
        <HistoryCalendar />
      </div>

      <SectionTitle>Recent Projects 📋</SectionTitle>
      <ProjectsList />
      <HorizontalDivider />

      <SectionTitle>Techstack 🚀</SectionTitle>
      <div className="mt-6 flex justify-center gap-2 flex-wrap">
        <TechnologyAnchors />
      </div>

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
