'use client';

import Image from 'next/image';
import LeftArrow from 'public/icons/Arrow-Left.svg';
import { useRouter } from 'next/navigation';
import { arrowLeft, bodyLine, box, headLine } from './Header.css';

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
    <nav className={box}>
      <a className={arrowLeft} onClick={navigate}>
        <Image src={LeftArrow} alt="LeftArrow" />
      </a>
      <h4 className={headLine}>{title}</h4>
      <h4 className={bodyLine}>
        {thisPage}
        {!thisPage && !entirePage ? '/' : null}
        {entirePage}
      </h4>
    </nav>
  );
}
