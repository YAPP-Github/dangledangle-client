'use client';
import * as styles from './MarqueeTitle.css';

import { DaenggleLogo } from '@/asset/icons';
import useHeader from '@/hooks/useHeader';

export default function MarqueeTitle() {
  useHeader({ title: '개인봉사자로 시작하기' });

  return (
    <>
      <section className={styles.titleContainer}>
        <DaenggleLogo
          style={{
            margin: 'auto',
            display: 'block'
          }}
        />
      </section>
    </>
  );
}
