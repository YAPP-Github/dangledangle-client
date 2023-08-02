'use client';
import { MyShelterInfo, MyVolInfo } from '@/api/mypage/mypage';
import useMyInfo from '@/api/mypage/useMyInfo';
import {
  ArrowRight,
  MypageChat,
  MypageNoti,
  MypageStar,
  MypageTerms
} from '@/asset/icons';
import { Caption2, H3 } from '@/components/common/Typography';
import LogoutSection from '@/components/mypage/LogoutSection/LogoutSection';
import MyStatusItem from '@/components/mypage/MyStatusItem/MyStatusItem';
import SettingItem from '@/components/mypage/SettingItem/SettingItem';
import useHeader from '@/hooks/useHeader';
import { useAuthContext } from '@/providers/AuthContext';
import uuidv4 from '@/utils/uuidv4';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import * as styles from './styles.css';

export interface SettingProps {
  label: string;
  link: string;
  Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export function isShelterInfo(
  obj: MyVolInfo | MyShelterInfo | undefined
): obj is MyShelterInfo {
  return obj !== undefined && 'name' in obj;
}

export default function Mypage() {
  useHeader({ title: '내 정보' });
  const pathname = usePathname();

  const { dangle_role } = useAuthContext();
  const isShelterRole = dangle_role === 'SHELTER';

  const NOTI: React.ReactNode[] = isShelterRole
    ? [
        '봉사 일정 하루 전 미리 알림 등을',
        <br key="linebreak1" />,
        '카카오톡 메세지로 제공해드려요.'
      ]
    : [
        '봉사 일정 관련 업데이트 및 공지 안내,',
        <br key="linebreak2" />,
        '참석자 대상 봉사 하루 전 미리 알림 등을',
        <br key="linebreak3" />,
        '카카오톡 메세지로 제공해드려요.'
      ];

  const settings: SettingProps[] = [
    { label: '카카오톡 알림 설정', link: '', Svg: MypageNoti },
    {
      label: '즐겨찾기 설정',
      link: pathname + '/volunteer/bookmark',
      Svg: MypageStar
    },
    { label: '문의하기', link: '', Svg: MypageChat },
    { label: '이용약관', link: '', Svg: MypageTerms }
  ];

  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });
  if (!info) return null;

  return (
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <H3 style={{ marginLeft: '4px' }}>
          안녕하세요! {isShelterInfo(info) ? info.name : info.nickName}님
        </H3>

        <Link
          href={`${pathname}${isShelterRole ? '/shelter/edit' : '/volunteer'}`}
        >
          <div className={styles.grid}>
            <Caption2 color="gray600">
              {isShelterRole && '보호소 '}계정 관리
            </Caption2>
            <ArrowRight stroke="#6C6C6C" />
          </div>
        </Link>

        <Link
          href={`${pathname}${
            isShelterRole ? '/shelter/event' : '/volunteer/event'
          }`}
        >
          <MyStatusItem />
        </Link>
      </main>

      <div className={styles.settingSection}>
        {settings.map((setting, index) => (
          <SettingItem
            key={uuidv4()}
            setting={setting}
            index={index}
            notification={NOTI}
            isShelterRole={isShelterRole}
            dangle_role={dangle_role}
          />
        ))}
      </div>

      <LogoutSection />
    </div>
  );
}
