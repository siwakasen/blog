import { css } from 'goober';
import { useRouter } from 'next/router';

import { getHslaColor, getHslString } from '@/lib/styles/colors';

import { cn } from '@/utils/styles/classNames';
import { sendEventTracker } from '@/utils/analytics/tracker';

import { InternalLink } from '../Typography/InternalLink';
import { Paragraph } from '../Typography/Paragraph';
import { Mark } from '../common/Mark';

export const LandingHero = () => {
  const router = useRouter();

  const baseCtaButton = css`
    display: inline-block;
    padding: 0.8rem 1.6rem;
    border-radius: 4rem;

    transition: background-position var(--transition-faster);
    background-size: 200%;
    background-position: 0% 50%;

    &:hover,
    &:focus {
      background-position: 100% 50%;
    }
  `;

  const ctaButton = css`
    position: relative;
    background-image: linear-gradient(
      70deg,
      ${getHslaColor('primary', 0.4)},
      ${getHslaColor('secondary', 0.4)},
      ${getHslaColor('primary', 0.3)}
    );
    padding: 3px;
    transition: 0.15s;
    isolation: isolate;
    outline: none !important;

    &:hover {
      background-image: linear-gradient(
        70deg,
        ${getHslaColor('secondary', 0.4)},
        ${getHslaColor('primary', 0.4)},
        ${getHslaColor('secondary', 0.3)}
      );
    }

    & > span {
      display: inline-block;
      border-radius: 4rem;
      padding: 0.75rem 1.55rem;
      z-index: 1;
      position: relative;
    }

    & > span::before {
      content: ' ';
      position: absolute;
      inset: 0;
      z-index: -1;
      background: white;
      border-radius: 4rem;
      background: hsla(${getHslString('bg')} / 0.85);
      backdrop-filter: contrast(105%) saturate(120%) blur(8px);
      padding: 0.75rem 1.55rem;
      transition: 0.7s;
      transform-origin: 50% 50%;
    }

    &:hover {
      transform: scale(1.02);
      transition: 0.3s;
      box-shadow: 0 8px 6px -8px ${getHslaColor('subtitle', 0.5)};
    }

    &:hover > span::before {
      transition: 0.4s;
      box-shadow: inset 0 0 10px -2px ${getHslaColor('bg', 0.5, { l: 12 })};
      transform: scaleX(1.05) scaleY(1.2);
    }

    &:active {
      transform: scale(1);
      transition: 0.1s;
      box-shadow: none;
      text-shadow: 1px 1px 1px ${getHslaColor('subtitle', 0.3)};
    }

    &:active > span::before {
      box-shadow: inset 0 0 10px -2px ${getHslaColor('subtitle', 0.2, { l: -12 })};
      transform: scaleX(0.98) scaleY(0.93);
      transition: 0.1s;
    }
  `;

  const wrapperClass = css`
    position: relative;
  `;

  return (
    <div className={cn(wrapperClass)}>
      <div
        className={cn(
          'p-4',
          'pb-8',
          'sm:p-8',
          'rounded-none',
          'sm:rounded-3xl',
          '-mx-4',
          'sm:mx-0',
          '-mt-12', // Cancels out the padding of <PageContainer />
          'sm:mt-0',
        )}
      >
        <h1 className="text-4xl md:text-6xl font-bold font-heading text-theme-heading transition-colors">
          Hi, I am Riksi! 👋
        </h1>
        <Paragraph>
          I am a software engineer{' '}
          <Mark>passionate with Linux and managing infrastructure.</Mark> I do
          homelabbing and self-host many services to explore infrastructure
          hands-on.
        </Paragraph>

        <Paragraph>
          I also enjoy software engineering, building various projects to
          deliver digital solutions.
        </Paragraph>

        <div className={cn('mt-8', 'sm:mt-12', 'flex')}>
          <InternalLink
            className={cn(baseCtaButton, ctaButton)}
            href="/about"
            onClick={() => {
              sendEventTracker({
                name: 'click',
                category: `${router.pathname} - hero`,
                label: 'More about me &arr;',
              });
            }}
            isNotFancy
          >
            <span>More about me &rarr;</span>
          </InternalLink>
        </div>
      </div>
    </div>
  );
};
