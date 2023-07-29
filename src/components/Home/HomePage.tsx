'use client';

import { HomeLogo } from '@/asset/icons';
import { useRouter } from 'next/navigation';
import Button from '../common/Button/Button';
import Carousel from '../common/Carousel/Carousel';
import * as styles from './HomePage.css';

export default function HomePage() {
  const router = useRouter();

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.homeLogo}>
        <HomeLogo />
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
