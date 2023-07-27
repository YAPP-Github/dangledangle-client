'use client';
import {
  ArrowRight,
  ArrowRightLg,
  MypageChat,
  MypageNoti,
  MypageStar,
  MypageTerms
} from '@/asset/icons';
import {
  Body1,
  Body3,
  Caption2,
  Caption3,
  H3
} from '@/components/common/Typography';
import useHeader from '@/hooks/useHeader';
import React from 'react';
import * as styles from './styles.css';
import Link from 'next/link';

interface SettingProps {
  label: string;
  link: string;
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export default function Mypage() {
  const setHeader = useHeader({ title: '내 정보' });
  const myVolStatus = [
    { value: '봉사 이력', cnt: 0 },
    { value: '봉사 대기', cnt: 4 },
    { value: '봉사 신청', cnt: 2 }
  ];
  const settings: SettingProps[] = [
    { label: '알림 설정', link: '', Svg: MypageNoti },
    { label: '즐겨찾기 설정', link: '', Svg: MypageStar },
    { label: '문의하기', link: '', Svg: MypageChat },
    { label: '이용약관', link: '', Svg: MypageTerms }
  ];
  return (
    <>
      <main className={styles.container}>
        <H3 style={{ marginLeft: '4px' }}>안녕하세요! 댕댕홍시님</H3>

        <Link href="">
          <div className={styles.grid}>
            <Caption2 color="gray600">계정 관리</Caption2>
            <ArrowRight />
          </div>
        </Link>

        <Link href="">
          <div className={styles.box}>
            {myVolStatus.map(({ value, cnt }, index) => (
              <section style={{ display: 'flex' }} key={index}>
                <div className={styles.txtGird}>
                  <H3>{cnt}</H3>
                  <Body3>{value}</Body3>
                </div>
                {index < myVolStatus.length - 1 && (
                  <div className={styles.stroke} />
                )}
              </section>
            ))}
          </div>
        </Link>
      </main>

      <main className={styles.settingSection}>
        {settings.map(({ link, label, Svg }, index) => (
          <Link href={link} key={index}>
            <main className={styles.settingSection} key={index}>
              <div className={styles.accountBox}>
                <div className={styles.accountTxt}>
                  <Svg />
                  <Body1>{label}</Body1>
                </div>
                <ArrowRightLg />
              </div>
              {index === 0 && (
                <Caption3 color="gray600" className={styles.noti}>
                  신청한 봉사 일정이 변경되었을 경우, 대기 신청한 봉사 일정에
                  자리가 생겼을 경우 등 일정 관련 소식을 카카오톡으로
                  알려드립니다.
                </Caption3>
              )}
            </main>
          </Link>
        ))}
      </main>
    </>
  );
}
