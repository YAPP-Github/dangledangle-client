'use client';
import * as styles from './Banner.css';
import { useRouter } from 'next/navigation';
import { Caption1, Caption2 } from '@/components/common/Typography';
import { ArrowRight } from '@/asset/icons';
import { DOM_ID_BANNER } from '@/constants/dom';
import { MouseEventHandler } from 'react';
import { URL_SERVICE_INTRODUCTION } from '@/constants/landingURL';

interface BannerProps {
  name: string;
  shelterId?: string;
}

export default function Banner({ name, shelterId }: BannerProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    window.open(URL_SERVICE_INTRODUCTION);
  };
  return (
    <section id={DOM_ID_BANNER}>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h1>안녕하세요! {name && <span>{name}님</span>}</h1>
          <h1>더 나은 세상을 만들어봐요</h1>
        </div>
        <a className={styles.infoLink} href="" onClick={handleClick}>
          <Caption2 color="gray600">댕글댕글 서비스를 소개합니다</Caption2>
          <ArrowRight stroke="#6C6C6C" />
        </a>
        {shelterId && <MyShelterHomeButton shelterId={shelterId} />}
      </div>
    </section>
  );
}

const MyShelterHomeButton = ({ shelterId }: { shelterId: string }) => {
  const router = useRouter();
  const moveToHome = () => {
    router.push(`/shelter/${shelterId}`);
  };
  return (
    <button className={styles.myShelterHomeButton} onClick={moveToHome}>
      <Caption1 color="white">MY 보호소 홈</Caption1>
    </button>
  );
};
