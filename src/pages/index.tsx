import { Flipped } from 'react-flip-toolkit';
import { GetStaticProps } from 'next/types';
import { PageMetaTags } from '@/components/Seo/PageMetaTags';
import { PostPreviewList } from '@/components/Blog/Post/PostPreviewList';
import { SectionTitle } from '@/components/Typography/SectionTitle';
import { LandingHero } from '@/components/Hero';
import { Post } from '@/blog/types';
import { getPosts } from '@/blog/getPosts';

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Readonly<Props>) {
  return (
    <>
      <PageMetaTags />

      <section aria-label="hero section" className=" min-w-screen">
        <div className="absolute left-1/2 -translate-x-1/2 top-20 w-screen max-w-full">
          <img
            alt="culture background by alif.web.id"
            loading="lazy"
            decoding="async"
            data-nimg="fill"
            className="absolute w-full object-contain justify-center opacity-[0.15]"
            src="/assets/background/ai.svg"
          />
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
