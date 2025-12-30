export type Project = {
  name: string;
  url: string;
  repo?: string;
  coverImage: string;
};

export const projects: Project[] = [
  {
    name: 'React Recaptcha v3',
    url: 'https://recaptcha.siwakasen.dev',
    repo: 'https://github.com/siwakasen/react-recaptcha-v3',
    coverImage:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/RecaptchaLogo.svg/2560px-RecaptchaLogo.svg.png',
  },
  {
    name: 'Bali Travel Ride',
    url: 'https://travel.vulpbox.com',
    repo: 'https://github.com/siwakasen/tourism-microservices',
    coverImage:
      'https://travel.vulpbox.com/_next/image?url=%2Fimages%2Fhero4_img.jpg&w=1920&q=75',
  },
  {
    name: 'Tekik Village',
    url: 'https://tekik.vercel.app',
    repo: 'https://github.com/siwakasen/tekik',
    coverImage:
      'https://tekik.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgambar.516c6652.jpg&w=3840&q=75',
  },
];
