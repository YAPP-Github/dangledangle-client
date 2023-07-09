'use client';
import {
  BaseIcon,
  LoudSpeakerIcon,
  ParkingIcon,
  PhoneIcon
} from '@/asset/icons';
import LoadingIndicator from '@/components/common/Button/LoadingIndicator';
import { Body2, Body3, H4 } from '@/components/common/Typography';
import dynamic from 'next/dynamic';
import * as styles from './GuideAndDetailPanel.css';
import { shelterInfoMock } from '@/types/shelter';

const DangleMap = dynamic(() => import('@/components/common/Map/DangleMap'), {
  loading: () => <LoadingIndicator color="primary" />
});

export default function GuideAndDeatilPanel() {
  // TODO : 보호소 정보 api 연동
  const shelterInfo = shelterInfoMock;

  return (
    <section className={styles.panelWrapper}>
      <article className={styles.infoWrapper}>
        <LoudSpeakerIcon />
        <div className={styles.contents}>
          <H4>사전 안내 사항</H4>
          {shelterInfo.notice?.split('\n').map((paragraph, i) => (
            <Body3 key={`shelter_notice_${i}`}>{paragraph}</Body3>
          ))}
        </div>
      </article>
      <article className={styles.infoWrapper}>
        <PhoneIcon />
        <div className={styles.contents}>
          <H4>연락처</H4>
          <Body2>{shelterInfo.phoneNumber}</Body2>
          <Body2>yapp12@gmail.com</Body2>
        </div>
      </article>
      <article className={styles.infoWrapper}>
        <ParkingIcon />
        <div className={styles.contents}>
          <H4>주차 정보</H4>
          {shelterInfo.parkingInfo?.parkingEnabled ? (
            <>
              <Body2>주차 가능</Body2>
              <Body3>주차 추가 안내사항 텍스트 예시</Body3>
            </>
          ) : (
            <Body2>주차 불가능</Body2>
          )}
        </div>
      </article>
      <article className={styles.infoWrapper}>
        <BaseIcon />
        <div className={styles.contents}>
          <H4>주소</H4>
          <DangleMap
            latitude={shelterInfo.address.latitude}
            longitude={shelterInfo.address.longitude}
          />
        </div>
      </article>
    </section>
  );
}
