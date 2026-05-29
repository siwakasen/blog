export type Project = {
  name: string;
  url: string;
  repo?: string;
  coverImage: string;
};

export const projects: Project[] = [
  {
    name: 'How to Pronounce',
    url: 'https://say.siwakasen.dev',
    repo: 'https://github.com/stars/siwakasen/lists/how-to-pronounce-in-english',
    coverImage: 'https://say.siwakasen.dev/un.png',
  },
  {
    name: 'Sekolah Tadika Prima',
    url: 'https://sekolahtadikaprima.sch.id',
    coverImage: 'sekolah-tadika-prima.webp',
  },
];
