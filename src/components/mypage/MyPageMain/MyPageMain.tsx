'use client';
import { MyShelterInfo, MyVolInfo } from '@/api/mypage/mypage';
import useMyInfo from '@/api/mypage/useMyInfo';
import useUpdateShelterAlarm from '@/api/mypage/useUpdateShelterAlarm';
import useUpdateVolInfo from '@/api/mypage/useUpdateVolInfo';
import {
  ArrowRight,
  ArrowRightLg,
  MypageChat,
  MypageNoti,
  MypageStar,
  MypageTerms
} from '@/asset/icons';
import ToggleSwitch from '@/components/common/ToggleSwitch/ToggleSwitch';
import {
  Body1,
  Body3,
  Caption2,
  Caption3,
  H3
} from '@/components/common/Typography';
import LogoutSection from '@/components/mypage/LogoutSection/LogoutSection';
import useHeader from '@/hooks/useHeader';
import useToast from '@/hooks/useToast';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useCallback } from 'react';
import * as styles from './MyPageMain.css';

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

export default function MyPageMain({ dangle_role }: { dangle_role: string }) {
  useHeader({ title: '내 정보' });
  const pathname = usePathname();
  const isShelterRole = dangle_role === 'SHELTER';

  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });
  const { mutateAsync: volunteerAlarm } = useUpdateVolInfo();
  const { mutateAsync: shelterAlarm } = useUpdateShelterAlarm();

  const toastOn = useToast();

  const handleToggleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let payload;

      if (!isShelterInfo(info)) {
        payload = {
          nickName: !isShelterInfo(info) ? info?.nickName! : '',
          phoneNumber: !isShelterInfo(info) ? info?.phoneNumber! : '',
          alarmEnabled: e.target.checked
        };

        volunteerAlarm(payload).then(res => {
          toastOn('카카오톡 알림 설정이 업로드 되었습니다.');
        });
      } else {
        payload = {
          alarmEnabled: e.target.checked
        };

        shelterAlarm(payload).then(res => {
          toastOn('카카오톡 알림 설정이 업로드 되었습니다.');
        });
      }
    },
    [volunteerAlarm, shelterAlarm, toastOn, info]
  );

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

  if (!info) return null;
  let myStatus;

  if (isShelterInfo(info)) {
    const {
      historyStat: { done, inProgress }
    } = info;

    myStatus = [
      { value: '모집 종료', cnt: done },
      { value: '모집 진행중', cnt: inProgress }
    ];
  } else {
    const {
      historyStat: { done, waiting, joining }
    } = info;

    myStatus = [
      { value: '봉사 이력', cnt: done },
      { value: '봉사 대기', cnt: waiting },
      { value: '봉사 신청', cnt: joining }
    ];
  }

  function KaKaoAlarm({
    setting,
    notification
  }: {
    setting: SettingProps;
    index: number;
    notification: React.ReactNode[];
  }) {
    const { label, Svg } = setting;
    return (
      <>
        <div className={styles.accountBox}>
          <div className={styles.accountTxt}>
            <Svg />
            <Body1>{label}</Body1>
          </div>
          <ToggleSwitch
            name={'alram'}
            onChange={handleToggleChange}
            checked={info?.alarmEnabled}
          />
        </div>

        <Caption3 color="gray600" className={styles.noti}>
          {notification as string[]}
        </Caption3>
        <div className={styles.divider} />
      </>
    );
  }

  function OtherAlarm({
    setting,
    index
  }: {
    setting: SettingProps;
    index: number;
  }) {
    const { link, label, Svg } = setting;
    return (
      <Link href={link}>
        <div className={styles.accountBox}>
          <div className={styles.accountTxt}>
            <Svg />
            <Body1>{label}</Body1>
          </div>
          <ArrowRightLg />
        </div>

        {index === 0 || index === 3 ? <div className={styles.divider} /> : null}
      </Link>
    );
  }

  return (
    <div className={styles.wrapper}>
      <main className={styles.container}>
        <H3 style={{ marginLeft: '4px' }}>
          안녕하세요! {isShelterInfo(info) ? info.name : info?.nickName}님
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
          <div className={styles.box}>
            {myStatus.map(({ value, cnt }, index) => (
              <section style={{ display: 'flex' }} key={index}>
                <div className={styles.txtGird}>
                  <H3>{cnt}</H3>
                  <Body3>{value}</Body3>
                </div>
                {index < myStatus.length - 1 && (
                  <div className={styles.stroke} />
                )}
              </section>
            ))}
          </div>
        </Link>
      </main>

      <div className={styles.settingSection}>
        {settings.map((setting, index) => {
          if (index === 1 && isShelterRole) return null;

          return index === 0 ? (
            <KaKaoAlarm setting={setting} index={index} notification={NOTI} />
          ) : (
            <OtherAlarm setting={setting} index={index} />
          );
        })}
      </div>

      <LogoutSection />
    </div>
  );
}
