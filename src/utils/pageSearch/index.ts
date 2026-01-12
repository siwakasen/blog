import { matchSorter } from 'match-sorter';

import { PageData } from '../../../types/types';

const pageData = require('./_files/pages-data.json') as PageData[];

export const search = (query: string) => {
  const matched = matchSorter(pageData, query, {
    keys: ['title', 'description', 'hiddenSearchTerm', 'link'],
    sorter: (items) =>
      items.sort((a, b) => {
        if (a.keyIndex !== b.keyIndex) {
          return a.keyIndex - b.keyIndex;
        }
        return b.rank - a.rank;
      }),
  });

  return matched;
};
