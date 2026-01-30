import { TECHNOLOGIES } from '@/constants/technologies';
import { ExternalLogoLink } from '../Typography/ExternalLogoLink';

export const TechnologyAnchors = () => {
  return (
    <>
      {TECHNOLOGIES.map(({ name, href, logo }) => {
        return (
          <ExternalLogoLink key={name} href={href} shouldShowPreviewOnHover>
            <span className='inline-flex h-20 w-20 items-center justify-center [&_svg]:h-full [&_svg]:w-full'>
              {logo}
            </span>
          </ExternalLogoLink>
        );
      })}
    </>
  );
};

