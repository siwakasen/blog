import { TECHNOLOGIES } from '@/constants/technologies';
import { ExternalLogoLink } from '../Typography/ExternalLogoLink';
import Image from 'next/image';

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

