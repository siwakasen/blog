/**
 * Helpful references to read when working with sitemaps
 *
 * - https://www.sitemaps.org/protocol.html
 * - https://support.google.com/webmasters/answer/183668?hl=en
 */

const path = require('path');
const fs = require('fs');

const RSS = require('rss');
const globby = require('globby');
const xmlFormat = require('xml-formatter');

const getTitleInFrontMatter = (mdxContent) => {
  const firstDelimiter = mdxContent.indexOf('---');
  const secondDelimiter = mdxContent.indexOf('---', firstDelimiter + 1);

  const frontmatterContent = mdxContent.slice(
    firstDelimiter + 3,
    secondDelimiter,
  );

  const title = frontmatterContent.match(/title:( |\s)(.*?)description:/ms)[2];

  return title.trim().replace(/(\r\n|\r|\n) /g, '');
};

const getDescriptionInFrontMatter = (mdxContent) => {
  const firstDelimiter = mdxContent.indexOf('---');
  const secondDelimiter = mdxContent.indexOf('---', firstDelimiter + 1);

  const frontmatterContent = mdxContent.slice(
    firstDelimiter + 3,
    secondDelimiter,
  );

  const description = frontmatterContent.match(
    /description:( |\s)(.*?)date:/ms,
  )[2];

  return description.trim().replace(/(\r\n|\r|\n) /g, '');
};

const getDateInFrontMatter = (mdxContent) => {
  const firstDelimiter = mdxContent.indexOf('---');
  const secondDelimiter = mdxContent.indexOf('---', firstDelimiter + 1);

  const frontmatterContent = mdxContent.slice(
    firstDelimiter + 3,
    secondDelimiter,
  );

  const date = frontmatterContent.match(/date: \'(.*)\'/)?.[1];

  return date;
};

async function generateRSSFeed() {
  const feed = new RSS({
    title: 'siwakasen.dev',
    site_url: 'https://siwakasen.dev',
    feed_url: 'https://siwakasen.dev/feed.xml',
  });
  const posts = await globby(['src/pages/posts/**/index.mdx']);
  let contents = posts.map((post, index) => {
    const content = fs.readFileSync(post, 'utf-8');

    return {
      postIndex: index,
      content,
    };
  });

  contents = contents.sort((a, b) => {
    const aDate = new Date(getDateInFrontMatter(a.content));
    const bDate = new Date(getDateInFrontMatter(b.content));

    return bDate.getTime() - aDate.getTime();
  });

  contents.forEach(({ content, postIndex }) => {
    const path = posts[postIndex]
      .replace('src/pages', '')
      .replace('/index.mdx', '');

    feed.item({
      title: getTitleInFrontMatter(content),
      guid: path,
      url: `https://siwakasen.dev${path}`,
      date: getDateInFrontMatter(content),
      description: getDescriptionInFrontMatter(content),
      custom_elements: [{ author: [{ name: 'Siwakasen' }] }],
    });
  });

  fs.writeFileSync('./.next/static/feed.xml', feed.xml({ indent: true }));
}

async function generateSiteMap() {
  const pages = await globby([
    'src/pages/**/*.tsx',
    '!src/pages/_*.tsx',
    '!src/pages/**/[id].tsx',
    '!src/pages/api',
  ]);

  const buildDate = new Date().toISOString().split('T')[0];

  // Read blog post dates from frontmatter for lastmod
  const postDates = {};
  const posts = await globby(['src/pages/posts/**/index.mdx']);
  posts.forEach((post) => {
    const content = fs.readFileSync(post, 'utf-8');
    const date = getDateInFrontMatter(content);
    // Extract post slug from path: src/pages/posts/<slug>/index.mdx
    const slug = post.replace('src/pages/posts/', '').replace('/index.mdx', '');
    if (date) {
      postDates[slug] = new Date(date).toISOString().split('T')[0];
    }
  });

  const getPageMeta = (route) => {
    if (route === '') {
      // Homepage
      return { changefreq: 'weekly', priority: '1.0', lastmod: buildDate };
    }
    if (route === 'blog') {
      return { changefreq: 'weekly', priority: '0.8', lastmod: buildDate };
    }
    if (route.startsWith('posts/')) {
      const slug = route.replace('posts/', '');
      return {
        changefreq: 'monthly',
        priority: '0.7',
        lastmod: postDates[slug] || buildDate,
      };
    }
    // About and other pages
    return { changefreq: 'monthly', priority: '0.5', lastmod: buildDate };
  };

  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .filter((page) => !page.includes('404'))
          .map((page) => {
            const path = page.replace('src/pages', '').replace('.tsx', '');

            // remove leading `/` and trailing `/index`
            // and change `/index` to just ''
            const route =
              path === '/index'
                ? ''
                : path.replace(/^\//, '').replace(/\/index$/, '');

            const meta = getPageMeta(route);

            return `
                  <url>
                    <loc>${`https://siwakasen.dev/${route}`}</loc>
                    <lastmod>${meta.lastmod}</lastmod>
                    <changefreq>${meta.changefreq}</changefreq>
                    <priority>${meta.priority}</priority>
                  </url>`;
          })
          .join('')}
      </urlset>
  `;

  fs.writeFileSync(
    path.resolve(__dirname, '../.next/static/sitemap.xml'),
    xmlFormat(sitemap),
  );
}

generateSiteMap();
generateRSSFeed();
