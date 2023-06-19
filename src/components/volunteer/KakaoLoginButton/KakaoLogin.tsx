'use client';

import Link from 'next/link';
import * as styles from './KakaoLogin.css';
import { H4 } from '@/components/common/Typography';

interface KakaoLoginProps {}
export default function KakaoLogin({}: React.PropsWithChildren<KakaoLoginProps>) {
  return (
    <>
      <Link href={process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL!}>
        <button className={styles.kakaoLoginButton}>
          <H4>카카오로 로그인</H4>
        </button>
      </Link>
    </>
  );
}
