'use client';
import { ArrowLeft } from '@/asset/icons';
import { headerState } from '@/store/header';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { Body2, H4 } from '../Typography';
import * as styles from './Header.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { palette } from '@/styles/color';
import { useMemo } from 'react';
import MainHeader from './MainHeader';
import { UserRole } from '@/constants/user';

interface HeaderComponentProps {
  initColor: string;
  initTitle?: string;
  initRole?: UserRole;
}

export default function Header({
  initColor,
  initTitle,
  initRole
}: HeaderComponentProps) {
  const headerValue = useRecoilValue(headerState);
  const {
    color,
    isHeader,
    isBackArrow,
    title,
    RightSideComponent,
    thisPage,
    entirePage
  } = headerValue;
  const router = useRouter();
  const pathName = usePathname();
  const navigate = () => {
    router.back();
  };

  const headerColor = useMemo(() => {
    if (!color || initColor === color) {
      return initColor === 'default' ? palette.background : initColor;
    } else {
      return color;
    }
  }, [color, initColor]);

  const headerTitle = useMemo(() => {
    if (!title || initTitle === title) {
      return initTitle;
    } else {
      return title;
    }
  }, [title, initTitle]);

  if (pathName === '/') {
    return <MainHeader role={initRole} />;
  }

  return (
    <>
      {isHeader === 'visible' ? (
        <nav
          className={styles.container}
          style={assignInlineVars({
            [styles.headerColor]: headerColor
          })}
        >
          <a className={styles.homeIcon} onClick={navigate}>
            {isBackArrow === 'visible' ? <ArrowLeft /> : null}
          </a>
          <H4 className={styles.title}>{headerTitle}</H4>
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
