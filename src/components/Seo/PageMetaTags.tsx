import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { createOgImageUrl } from '@/utils/createOgImageUrl';
import { publicUrl } from '@/utils/constants';

const defaultTitle = 'Siwakasen | Software Engineer';
const defaultDescription =
  'Personal blog of Siwakasen. Passionate about Linux, homelabbing, and building apps from backend to frontend. 🌐';

const defaultOgImageTitle = `Hi, I am Siwakasen!`;
const defaultOgImage = createOgImageUrl({ title: defaultOgImageTitle });

const siteName = 'siwakasen.dev';
const authorName = 'Siwakasen';
const authorUrl = 'https://github.com/siwakasen';

type PageType = 'website' | 'article' | 'profile';

interface Props {
  image?: string;
  title?: string;
  description?: string;
  publishDate?: string;
  readingTime?: string;
  pageType?: PageType;
  tags?: string[];
}

/**
 * Generates JSON-LD structured data based on page type
 */
const generateJsonLd = ({
  pageType,
  title,
  description,
  image,
  publishDate,
  url,
  tags,
}: {
  pageType: PageType;
  title: string;
  description: string;
  image: string;
  publishDate: string;
  url: string;
  tags: string[];
}) => {
  const author = {
    '@type': 'Person',
    '@id': authorUrl,
    name: authorName,
    url: authorUrl,
  };

  if (pageType === 'article') {
    // BlogPosting schema for blog posts
    const blogPosting: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description: description,
      image: [image],
      datePublished: publishDate,
      dateModified: publishDate,
      author: author,
      publisher: author,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      ...(tags.length > 0 && { keywords: tags.join(', ') }),
    };

    // Breadcrumb for blog posts
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${publicUrl}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${publicUrl}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: title,
          item: url,
        },
      ],
    };

    return [blogPosting, breadcrumb];
  }

  if (pageType === 'profile') {
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: title,
        description: description,
        url: url,
        mainEntity: author,
      },
    ];
  }

  // Default: website
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      description: description,
      url: `${publicUrl}/`,
      author: author,
    },
  ];
};

export const PageMetaTags: React.FC<Props> = ({
  image = defaultOgImage,
  title = defaultTitle,
  description = defaultDescription,
  publishDate = '',
  pageType = 'website',
  tags = [],
}) => {
  const router = useRouter();
  const url = `${publicUrl}${router.asPath}`;

  const jsonLdSchemas = generateJsonLd({
    pageType,
    title,
    description,
    image,
    publishDate,
    url,
    tags,
  });

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph meta tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={pageType === 'article' ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific OG tags */}
      {pageType === 'article' && publishDate && (
        <meta property="article:published_time" content={publishDate} />
      )}
      {pageType === 'article' && (
        <meta property="article:author" content={authorUrl} />
      )}
      {pageType === 'article' &&
        tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {/* JSON-LD Structured Data */}
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </Head>
  );
};
