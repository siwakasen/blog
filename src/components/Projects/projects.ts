export type Project = {
  name: string;
  url: string;
  repo?: string;
  coverImage: string;
};

export const projects: Project[] = [
  {
    name: 'How to Pronounce',
    url: 'https://say.siwakasen.dev/?utm_source=blog',
    repo: 'https://github.com/stars/siwakasen/lists/how-to-pronounce-in-english',
    coverImage: 'https://say.siwakasen.dev/un.png',
  },
  {
    name: 'Sekolah Tadika Prima',
    url: 'https://sekolahtadikaprima.sch.id/?utm_source=blog',
    coverImage: 'sekolah-tadika-prima.webp',
  },
];
