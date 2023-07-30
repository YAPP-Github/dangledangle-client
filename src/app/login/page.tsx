'use client';

import { MainLogo } from '@/asset/icons';
import Button from '@/components/common/Button/Button';
import Carousel from '@/components/common/Carousel/Carousel';
import useHeader from '@/hooks/useHeader';
import { useRouter } from 'next/navigation';
import * as styles from './styles.css';

export default function LoginPage() {
  const router = useRouter();
  useHeader({ title: '로그인 또는 회원가입' });

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.homeLogo}>
        <MainLogo />
      </div>
      <Carousel>
        {new Array(5).fill(0).map((_value, idx) => (
          <div key={idx} className={styles.item}></div>
        ))}
      </Carousel>
      <div className={styles.buttomWrap}>
        <Button variant="line" onClick={() => router.push('/login/volunteer')}>
          개인 봉사자로 시작하기
        </Button>
        <Button variant="line" onClick={() => router.push('/login/shelter')}>
          보호소 파트너로 시작하기
        </Button>
      </div>
    </div>
  );
}
