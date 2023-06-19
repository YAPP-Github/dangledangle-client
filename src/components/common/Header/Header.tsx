'use client';

import { useRouter } from 'next/navigation';
import * as styles from './Header.css';
import { ArrowLeft } from '@/asset/icons';
import { Body2, H4 } from '../Typography';
import { useRecoilValue } from 'recoil';
import { headerState } from '@/store/header';

interface HeaderProps {
  /** 헤더 타이틀 */
  title?: string;
  /** form 현재 페이지 number */
  thisPage?: number;
  /** form 전체 페이지 number */
  entirePage?: number;
  /** 이동 URL */
  href?: string;
}

export default function Header({
  title = '',
  thisPage,
  entirePage,
  href
}: HeaderProps) {
  const headerValue = useRecoilValue(headerState);

  const router = useRouter();
  const navigate = () => {
    href ? router.push('/' + href) : router.back();
  };

  return (
    <nav className={styles.container}>
      <a className={styles.arrowLeft} onClick={navigate}>
        <ArrowLeft />
      </a>
      <H4>{headerValue?.title}</H4>
      <Body2>
        {headerValue?.thisPage}
        {headerValue?.entirePage ? '/' : null}
        {headerValue?.entirePage}
      </Body2>
    </nav>
  );
}
