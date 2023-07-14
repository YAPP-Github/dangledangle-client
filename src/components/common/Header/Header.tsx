'use client';

import { ArrowLeft } from '@/asset/icons';
import { headerState } from '@/store/header';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { Body2, H4 } from '../Typography';
import * as styles from './Header.css';

interface HeaderProps {
  /** 이동 URL */
  href?: string;
}

export default function Header({ href }: HeaderProps) {
  const headerValue = useRecoilValue(headerState);

  const router = useRouter();
  const navigate = () => {
    href ? router.push('/' + href) : router.back();
  };

  return (
    <>
      {headerValue?.isHeader === 'visible' ? (
        <nav className={styles.container}>
          <a className={styles.arrowLeft} onClick={navigate}>
            {headerValue?.isBackArrow === 'visible' ? <ArrowLeft /> : null}
          </a>
          <H4>{headerValue?.title}</H4>
          <Body2>
            {headerValue?.thisPage}
            {headerValue?.entirePage ? '/' : null}
            {headerValue?.entirePage}
          </Body2>
        </nav>
      ) : null}
    </>
  );
}
