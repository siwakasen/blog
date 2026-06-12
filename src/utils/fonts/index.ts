import localFont from '@next/font/local';

export const mainFont = localFont({
  src: './files/work-sans-latin-variable.woff2',
  variable: '--main-font',
  display: 'swap',
  preload: true,
  weight: '400 700',
});

export const headingFont = localFont({
  src: './files/lora-latin-variable.woff2',
  variable: '--heading-font',
  display: 'swap',
  preload: true,
  weight: '400 700',
});

export const fontsClasses = `${mainFont.variable} ${headingFont.variable}`;
export const initFonts = () => fontsClasses;
