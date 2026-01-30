import Image from 'next/image';
import { TECHNOLOGIES } from '@/constants/technologies';
import { ExternalLogoLink } from '../Typography/ExternalLogoLink';

export const TechnologyAnchors = () => {
  return (
    <>
      {TECHNOLOGIES.map(({ name, href, logo }) => {
        return (
          <ExternalLogoLink key={name} href={href} shouldShowPreviewOnHover>
            <Image
              className="object-contain"
              width={80}
              height={80}
              alt={name}
              src={logo}
            />
          </ExternalLogoLink>
        );
      })}
    </>
  );
};

