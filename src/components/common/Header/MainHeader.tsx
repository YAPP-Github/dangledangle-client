'use client';
import { MainLogo } from '@/asset/icons';
import { useRouter } from 'next/navigation';
import { Body3, Body4 } from '../Typography';
import * as styles from './Header.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { palette } from '@/styles/color';
import { UserRole } from '@/constants/user';
import useObserver from '@/hooks/useObserver';
import { DOM_ID_BANNER } from '@/constants/dom';
import { useEffect, useMemo, useState } from 'react';
import { useAuthContext } from '@/providers/AuthContext';

interface MainHeaderProps {
  initRole?: UserRole;
  shelterId?: number;
}

export default function MainHeader({ initRole, shelterId }: MainHeaderProps) {
  const router = useRouter();
  const [role, setRole] = useState(initRole);
  const { dangle_role } = useAuthContext();
  const refresh = () => {
    location.reload();
  };
  const moveToMypage = () => {
    const path = '/admin';
    router.push(path);
  };

  const moveToLogin = () => {
    if (role === 'NONE') router.push('/login');
  };

  const content = useMemo(() => {
    let setRole = null;
    if (initRole || !role || initRole === role) {
      setRole = initRole;
    } else {
      setRole = role;
    }
    return setRole === 'VOLUNTEER'
      ? '개인봉사자'
      : role === 'SHELTER'
      ? '보호소 파트너'
      : '로그인/회원가입';
  }, [initRole, role]);

  useEffect(() => {
    if (initRole !== role) {
      setRole(dangle_role);
    }
  }, [initRole, role, dangle_role]);

  const { toggle } = useObserver(DOM_ID_BANNER);

  useEffect(() => {
    const header = document.getElementById('main_header');
    if (!header) return;
    const on = () => {
      header.classList.add(styles.headerColorOn);
      header.classList.remove(styles.headerColorOff);
    };
    const off = () => {
      header.classList.remove(styles.headerColorOn);
      header.classList.add(styles.headerColorOff);
    };
    toggle(on, off);
  }, []);

  return (
    <nav
      id="main_header"
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
