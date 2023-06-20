'use client';
import Marquee from '@/components/common/Marquee/Marquee';
import * as styles from './MarqueeTitle.css';
import Typo from './typo.svg'; // 추후에 svg 바뀔수도 있어서 일단 임시로 여기서 가져옴
import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';

export default function MarqueeTitle() {
  const setHeader = useSetRecoilState(headerState);
  useLayoutEffect(() => {
    setHeader({
      title: '개인봉사자로 시작하기',
      thisPage: null,
      entirePage: null
    });
  });
  return (
    <>
      <section className={styles.titleContainer}>
        <Marquee duration={5}>
          <Typo />
        </Marquee>
      </section>
    </>
  );
}
