import Script from 'next/script';
;
import { isProd } from '@/utils/constants';

// This component should be included in your _document.tsx inside the <Head> section
export const GTMHead = () => {
  if (!isProd) return null;
  
  return (
    <Script id="gtm-script" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NZQ9W826');
      `}
    </Script>
  );
};

// This component should be included in your _app.tsx or layout.tsx
// It will render the noscript iframe after the opening <body> tag
export const GTMBody = () => {
  if (!isProd) return null;
  
  return (
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-NZQ9W826"
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
};

// For backward compatibility
export const Analytics = () => {
  return isProd ? (
    <>
      <GTMHead />
      <GTMBody />
    </>
  ) : null;
};
