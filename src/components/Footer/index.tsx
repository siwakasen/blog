import Link from 'next/link';

import { IOLazyFeedbackFish } from '@/components/FeedbackFish/Lazy';

import { cn } from '@/utils/styles/classNames';

import { SectionContainer } from '../SectionContainer';
import { LightButton } from '../common/Button/LightButton';

type FooterLink = {
  label: string;
  href: string;
  type?: 'external';
  rel?: string;
};

type FooterSection = {
  sectionTitle: string;
  links: FooterLink[];
};

const FOOTER_LINKS: FooterSection[] = [
  {
    sectionTitle: 'Social',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/siwakasen',
        type: 'external',
      },
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/riksi/',
        rel: 'me',
        type: 'external',
      },
    ],
  },
  {
    sectionTitle: 'Navigation',
    links: [
      {
        label: 'About',
        href: '/about',
      },
      {
        label: 'Blogs',
        href: '/blog',
      },
    ],
  },
  {
    sectionTitle: 'Tags',
    links: [
      {
        label: 'Tech',
        href: '/blog?tags=tech',
      },
    ],
  },
];

export const Footer = () => {
  return (
    <footer
      className={cn(
        'text-sm',
        'py-16',
        'mt-20',
        'border-t-2',
        'border-surface-0',
        'bg-surface-3',
      )}
    >
      <SectionContainer>
        <div
          className={cn(
            'flex',
            'flex-col',
            'justify-between',
            'sm:flex-row',
            'sm:space-y-0',
            'space-y-12',
          )}
        >
          <div
            className={cn(
              'flex',
              'flex-col',
              'sm:flex-row',
              'sm:space-x-32',
              'sm:space-y-0',
              'space-y-12',
            )}
          >
            {FOOTER_LINKS.map((section) => {
              return (
                <div
                  key={section.sectionTitle}
                  className={cn('flex', 'flex-col', 'space-y-4')}
                >
                  <h3
                    className={cn(
                      'text-lg',
                      'font-heading',
                      'text-theme-heading',
                    )}
                  >
                    {section.sectionTitle}
                  </h3>
                  <ul
                    className={cn(
                      'text-theme-subtitle',
                      'flex',
                      'flex-col',
                      'space-y-1',
                    )}
                  >
                    {section.links.map((link) => {
                      const Wrapper = link.type !== 'external' ? Link : 'a';
                      const wrapperProps = {
                        href: link.href,
                        rel: link.rel,
                        className: 'hover:text-theme-text',
                      };

                      return (
                        <li key={link.href}>
                          <Wrapper {...wrapperProps}>{link.label}</Wrapper>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-end">
            <IOLazyFeedbackFish>
              <LightButton>Got feedback?</LightButton>
            </IOLazyFeedbackFish>
            <p className="text-theme-subtitle text-xs pt-2">
              Website template by{' '}
              <a
                href="https://github.com/jackyef/my-site"
                className="hover:underline "
              >
                Jackyef
              </a>
            </p>
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};
