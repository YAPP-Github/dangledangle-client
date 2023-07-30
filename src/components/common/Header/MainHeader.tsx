'use client';
import { MainLogo } from '@/asset/icons';
import { useRouter } from 'next/navigation';
import { Body3, Body4 } from '../Typography';
import * as styles from './Header.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { palette } from '@/styles/color';
import { UserRole } from '@/constants/user';

interface MainHeaderProps {
  role?: UserRole;
  shelterId?: number;
}

export default function MainHeader({ role, shelterId }: MainHeaderProps) {
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };
  const moveToMypage = () => {
    const path =
      role === 'VOLUNTEER'
        ? '/admin/volunteer'
        : role === 'SHELTER'
        ? `/shelter/${shelterId}`
        : '';
    router.push(path);
  };

  const moveToLogin = () => {
    if (role === 'NONE') router.push('/login');
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
        <Body3 style={{ cursor: 'default' }} onClick={moveToLogin}>
          {content}
        </Body3>
        {(role === 'SHELTER' || role === 'VOLUNTEER') && (
          <a className={styles.myPageIcon} onClick={moveToMypage}>
            <Body4 color="gray600">MY</Body4>
          </a>
        )}
      </div>
    </nav>
  );
}
