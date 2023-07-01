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
        <Daenggle height={16} width={140} viewBox="0 0 279 30" />
        <div className={styles.linkWrapper}>
          {footerLinks.map(({ href, title }, index) => (
            <>
              <a href={href}>
                <Caption1>{title}</Caption1>
              </a>
              {index < footerLinks.length - 1 && <Caption1>•</Caption1>}
            </>
          ))}
        </div>
      </footer>
    </>
  );
}
