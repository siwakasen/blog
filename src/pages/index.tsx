import { Flipped } from 'react-flip-toolkit';
import { GetStaticProps } from 'next/types';
import { useRouter } from 'next/router';
import { PageMetaTags } from '@/components/Seo/PageMetaTags';
import { PostPreviewList } from '@/components/Blog/Post/PostPreviewList';
import { SectionTitle } from '@/components/Typography/SectionTitle';
import { LandingHero } from '@/components/Hero';
import { Post } from '@/blog/types';
import { getPosts } from '@/blog/getPosts';
import { Panel } from '@/components/common/Panel';
import { Paragraph } from '@/components/Typography/Paragraph';
import { useContext } from 'react';
import { ThemeContext } from '@/components/Theme/ThemeProvider';
import { SkipSSR } from '@/components/SkipSSR';

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  const router = useRouter();
  const wasRedirected = router.query.status === 'redirected';
  const [theme] = useContext(ThemeContext);

  return (
    <>
      <PageMetaTags />

      <section aria-label="hero section" className=" min-w-screen">
        {wasRedirected && (
          <Panel title="⚠ Notice" type="info">
            <Paragraph>
              Looks like you were redirected here!{' '}
              <a
                className="underline"
                href="#"
                onClick={() => window.history.back()}
              >
                Click here to go back.
              </a>
            </Paragraph>
          </Panel>
        )}
        <div className="absolute left-1/2 -translate-x-1/2 top-20 w-screen max-w-full">
          <SkipSSR>
            <img
              alt="culture background by alif.web.id"
              loading="lazy"
              decoding="async"
              className={`absolute w-full object-contain flex justify-center ${
                theme === 'default' || theme === 'purple-and-gold'
                  ? 'opacity-[0.25]'
                  : 'opacity-10'
              }`}
              src="/assets/background/ai.svg"
            />
          </SkipSSR>
        </div>
        <LandingHero />
      </section>

      <div className="my-16" />

      <section aria-label="latest writings">
        <Flipped flipId="latest-writing-heading" spring="noWobble" translate>
          {(flippedProps: any) => (
            <SectionTitle {...flippedProps}>Latest writings ✍️</SectionTitle>
          )}
        </Flipped>

        <PostPreviewList posts={posts} />
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      posts: await getPosts({ limit: 3, onlyPreview: true }),
    },
  };
};
