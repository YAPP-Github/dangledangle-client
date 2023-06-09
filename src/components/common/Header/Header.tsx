'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Body2, H4 } from '../typography';
import * as styles from './Header.css';

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
  const router = useRouter();

  const navigate = () => {
    href ? router.push('/' + href) : router.back();
  };

  return (
    <nav className={styles.container}>
      <a className={styles.arrowLeft} onClick={navigate}>
        <Image
          src="icons/Arrow-Left.svg"
          alt="LeftArrow"
          width={24}
          height={24}
        />
      </a>
      <H4>{title}</H4>
      <Body2>
        {thisPage}
        {entirePage ? '/' : null}
        {entirePage}
      </Body2>
    </nav>
  );
}
