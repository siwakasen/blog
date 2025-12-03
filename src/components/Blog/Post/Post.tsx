import { useLayoutEffect, useEffect, useContext } from 'react';
import { spring } from 'react-flip-toolkit';
import tinytime from 'tinytime';
import { useRouter } from 'next/router';
import { css } from 'goober';
import Giscus from '@giscus/react';
import { PageMetaTags } from '@/components/Seo/PageMetaTags';
import { HorizontalDivider } from '@/components/Divider';
import { useShouldAnimateNavigation } from '@/contexts/navigation';
import { MDXProvider } from '@/components/common/MDX';
import { Post as PostType } from '@/blog/types';
import { getHslaColor } from '@/lib/styles/colors';
import { cn } from '@/utils/styles/classNames';
import { createOgImageUrl } from '@/utils/createOgImageUrl';
import { PostHeader } from './PostHeader';
import { TableOfContents } from './TableOfContents';
const postDateTemplate = tinytime('{MM} {DD}, {YYYY}');
import { ThemeContext } from '@/components/Theme/ThemeProvider';

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

interface Props {
  post: PostType;
}

export default function Post({ post }: Props) {
  const router = useRouter();
  const shouldAnimateNavigation = useShouldAnimateNavigation();
  const isBlogPost = router.pathname.startsWith('/posts/');
  const { metadata: meta } = post;
  const [theme] = useContext(ThemeContext);

  useIsomorphicLayoutEffect(() => {
    const el = document.getElementById('restOfArticle');

    if (el && shouldAnimateNavigation) {
      el.style.opacity = '0';

      spring({
        config: 'noWobble',
        values: {
          translateY: [-15, 0],
          opacity: [0, 1],
        },
        // @ts-expect-error
        onUpdate: ({ translateY, opacity }) => {
          el.style.opacity = opacity;
          el.style.transform = `translateY(${translateY}px)`;
        },
        delay: 400,
      });
    }
  }, [shouldAnimateNavigation]);

  return (
    <main>
      <article>
        <PageMetaTags
          title={meta.title}
          description={meta.description}
          image={createOgImageUrl(meta.ogImage)}
          readingTime={meta.readingTime}
          publishDate={postDateTemplate.render(new Date(meta.date))}
        />
        <PostHeader meta={meta} />

        <div className="pb-16 xl:pb-20">
          <div
            className={cn('flex items-start relative', {
              '2xl:w-[140%] 2xl:ml-[-20%]': isBlogPost,
            })}
          >
            {isBlogPost && (
              <div className="hidden 2xl:block w-[27%] sticky top-[8rem] mt-[1.25em]">
                {/* Only render TOC on 2xl and above */}
                <TableOfContents headings={post.headings} />
              </div>
            )}

            <div
              className={cn(
                'w-full',
                {
                  '2xl:pl-8 2xl:ml-8 2xl:border-l': isBlogPost,
                },
                css`
                  border-color: ${getHslaColor('text', 0.1)};
                `,
              )}
            >
              <div className="prose max-w-none pb-8">
                <MDXProvider mdxSource={post.mdxSource} />
              </div>
            </div>
          </div>

          <HorizontalDivider />

          {isBlogPost && (
            <Giscus
              id="comments"
              repo="siwakasen/blog"
              repoId="R_kgDOQg6q1A"
              category="General"
              categoryId="DIC_kwDOQg6q1M4CzSbe"
              mapping="pathname"
              term="Welcome to @giscus/react component!"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme={
                theme === 'default' || theme == 'purple-and-gold'
                  ? 'light'
                  : 'dark'
              }
              lang="en"
              loading="lazy"
            />
          )}
        </div>
      </article>
    </main>
  );
}
