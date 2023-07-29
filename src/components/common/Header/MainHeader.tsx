'use client';
import { MainLogo } from '@/asset/icons';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/providers/AuthContext';
import { Body3, Body4 } from '../Typography';
import * as styles from './Header.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { palette } from '@/styles/color';

export default function MainHeader() {
  const router = useRouter();
  const { dangle_role: role } = useAuthContext();
  const refresh = () => {
    router.refresh();
  };
  const moveToMypage = () => {
    const path =
      role === 'VOLUNTEER'
        ? '/admin/volunteer'
        : role === 'SHELTER'
        ? '/admin/shelter'
        : '';

    router.push(path);
  };
  const content =
    role === 'VOLUNTEER'
      ? '개인봉사자'
      : role === 'SHELTER'
      ? '보호소 파트너'
      : '로그인/회원가입';

  return (
    <nav
      className={styles.container}
      style={assignInlineVars({
        [styles.headerColor]: palette.background
      })}
    >
      <a className={styles.homeIcon} onClick={refresh}>
        <MainLogo />
      </a>

      <div className={styles.rightSide}>
        <Body3 style={{ cursor: 'default' }}>{content}</Body3>
        {role !== 'NONE' && (
          <a className={styles.myPageIcon} onClick={moveToMypage}>
            <Body4 color="gray600">MY</Body4>
          </a>
        )}
      </div>
    </nav>
  );
}
