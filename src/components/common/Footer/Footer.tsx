'use client';
import { Daenggle } from '@/asset/icons';
import * as styles from './Footer.css';
import { Caption1 } from '../Typography';

export default function Footer() {
  const footerLinks = [
    {
      href: '#',
      title: '개인정보 처리방침'
    },
    {
      href: '#',
      title: '이용약관'
    },
    {
      href: '#',
      title: 'FAQ'
    }
  ];

  return (
    <>
      <footer className={styles.footerWrapper}>
        <div>
          <Daenggle height={22} width={54} />
        </div>
        <div className={styles.linkWrapper}>
          {footerLinks.map(({ href, title }, index) => (
            <div key={`footer_${index}`}>
              <a href={href}>
                <Caption1>{title}</Caption1>
              </a>
              {index < footerLinks.length - 1 && <Caption1>•</Caption1>}
            </div>
          ))}
        </div>
      </footer>
    </>
  );
}
