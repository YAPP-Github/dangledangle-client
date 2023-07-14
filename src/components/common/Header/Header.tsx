'use client';

import { ArrowLeft } from '@/asset/icons';
import { headerState } from '@/store/header';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { Body2, H4 } from '../Typography';
import * as styles from './Header.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { palette } from '@/styles/color';

interface HeaderComponentProps {
  /** 이동 URL */
  href?: string;
}

export default function Header({ href }: HeaderComponentProps) {
  const {
    color,
    isHeader,
    isBackArrow,
    title,
    RightSideComponent,
    thisPage,
    entirePage
  } = useRecoilValue(headerState);

  const router = useRouter();
  const navigate = () => {
    href ? router.push('/' + href) : router.back();
  };

  return (
    <>
      {isHeader === 'visible' ? (
        <nav
          className={styles.container}
          style={assignInlineVars({
            [styles.headerColor]: color || palette.background
          })}
        >
          <a className={styles.arrowLeft} onClick={navigate}>
            {isBackArrow === 'visible' ? <ArrowLeft /> : null}
          </a>
          <H4 className={styles.title}>{title}</H4>
          <div className={styles.rightSide}>
            {<PageNumbering thisPage={thisPage} entirePage={entirePage} />}
            {RightSideComponent && <RightSideComponent />}
          </div>
        </nav>
      ) : null}
    </>
  );
}

const PageNumbering = ({
  thisPage,
  entirePage
}: {
  thisPage?: number | null;
  entirePage?: number | null;
}) => {
  return (
    <Body2>
      {thisPage}
      {entirePage ? '/' : null}
      {entirePage}
    </Body2>
  );
};
