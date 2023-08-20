'use client';
import { MyShelterInfo, MyVolInfo } from '@/api/mypage/mypage';
import useLogout from '@/api/mypage/useLogout';
import useMyInfo from '@/api/mypage/useMyInfo';
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
  ButtonText2,
  Caption2,
  Caption3,
  H3
} from '@/components/common/Typography';
import useDialog from '@/hooks/useDialog';
import useHeader from '@/hooks/useHeader';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
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
  const router = useRouter();
  const isShelterRole = dangle_role === 'SHELTER';

  const { dialogOn, dialogOff } = useDialog();

  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });
  const { mutate: logout } = useLogout();

  const handleLogout = async () => {
    dialogOn({
      message: '로그아웃 하시겠습니까?',
      close: {},
      confirm: {
        text: '로그아웃',
        onClick: () => {
          dialogOff();
          logout();
        }
      }
    });
  };
  const moveToUnregister = () => router.push('/unregister');

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
              <>
                <div className={styles.txtGird} key={index}>
                  <H3>{cnt}</H3>
                  <Body3 style={{ whiteSpace: 'nowrap' }}>{value}</Body3>
                </div>
                {index < myStatus.length - 1 && (
                  <div className={styles.stroke} />
                )}
              </>
            ))}
          </div>
        </Link>
      </main>

      <div className={styles.settingSection}>
        {settings.map(({ link, label, Svg }, index) => {
          if (index === 1 && isShelterRole) return;

          return (
            <Link href={link} key={index}>
              <div className={styles.accountBox}>
                <div className={styles.accountTxt}>
                  <Svg />
                  <Body1>{label}</Body1>
                </div>

                <ArrowRightLg />
              </div>
              {index === 0 && (
                <Caption3 color="gray600" className={styles.noti}>
                  {NOTI}
                </Caption3>
              )}
              {index === 0 || index === 3 ? (
                <div className={styles.divider} />
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className={styles.loginContainer}>
        <div className={styles.accountBox}>
          <Body1 color="error" onClick={handleLogout}>
            로그아웃
          </Body1>
        </div>

        <div className={styles.btnWrapper} onClick={moveToUnregister}>
          <ButtonText2 color="gray400" className={styles.btnTxt}>
            회원탈퇴
          </ButtonText2>
        </div>
      </div>
    </div>
  );
}
