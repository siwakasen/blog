// import { matchSorter } from 'match-sorter';
import Fuse from 'fuse.js';
import { PageData } from '../../../types/types';
const pageData = require('./_files/pages-data.json') as PageData[];

export const search = (query: string) => {
  // const matched = matchSorter(pageData, query, {
  //   keys: ['title', 'description', 'hiddenSearchTerm', 'link'],
  //   sorter: (items) =>
  //     items.sort((a, b) => {
  //       if (a.keyIndex !== b.keyIndex) {
  //         return a.keyIndex - b.keyIndex;
  //       }
  //       return b.rank - a.rank;
  //     }),
  // });

  const fuse = new Fuse(pageData, {
    keys: [{ name: 'title', weight: 2 }, 'description', 'link'],
  });

  const result = fuse.search(query).map((r) => r.item);

  return result;
};
