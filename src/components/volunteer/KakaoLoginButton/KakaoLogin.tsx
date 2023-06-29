'use client';

import Link from 'next/link';
import * as styles from './KakaoLogin.css';
import { H4 } from '@/components/common/Typography';
import useHeader from '@/hooks/useHeader';
import { KakaoLogo } from '@/asset/icons';

interface KakaoLoginProps {}
export default function KakaoLogin({}: React.PropsWithChildren<KakaoLoginProps>) {
  const setHeader = useHeader({ title: '개인봉사자로 시작하기' });

  return (
    <>
      <Link href={process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL!}>
        <button className={styles.kakaoLoginButton}>
          <KakaoLogo />
          <H4>카카오로 로그인</H4>
        </button>
      </Link>
    </>
  );
}
