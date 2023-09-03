'use client';
import { Daenggle } from '@/asset/icons';
import * as styles from './Footer.css';
import { Caption1 } from '../Typography';
import {
  FooterServerSideRenderProp,
  footerServerSideRenderProp
} from '@/utils/middleware/footerServerSideRenderProp';
import { usePathname } from 'next/navigation';
import { matchURL } from '@/utils/middleware/matchUrl';
import { MouseEventHandler, useCallback } from 'react';

type FooterProps = Omit<FooterServerSideRenderProp, 'url'>;

export default function Footer({ backgroundColor = 'default' }: FooterProps) {
  const path = usePathname();
  const matchedFooterURL = matchURL(footerServerSideRenderProp);
  const matchedIndex = matchedFooterURL(path);
  const visiblity = matchedIndex !== null;

  const handleClick: (href: string) => MouseEventHandler<HTMLDivElement> =
    useCallback(
      href => e => {
        e.preventDefault();
        window.open(href);
      },
      []
    );

  const footerLinks = [
    {
      href: '#',
      title: '개인정보 처리방침'
    },
    {
      href: 'https://dankim9494.notion.site/dankim9494/8334ce2511894b71a0f57dca52367e4c',
      title: '이용약관'
    },
    {
      href: '#',
      title: 'FAQ'
    }
  ];

  return (
    <>
      {visiblity && (
        <footer
          style={{
            backgroundColor: backgroundColor === 'white' ? 'white' : ''
          }}
          className={styles.footerWrapper({ visible: visiblity })}
        >
          <div>
            <Daenggle height={22} width={54} />
          </div>
          <div className={styles.linkWrapper}>
            {footerLinks.map(({ href, title }, index) => (
              <div key={`footer_${index}`} onClick={handleClick(href)}>
                <Caption1>{title}</Caption1>
                {index < footerLinks.length - 1 && <Caption1>•</Caption1>}
              </div>
            ))}
          </div>
        </footer>
      )}
    </>
  );
}
