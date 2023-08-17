'use client';
import { MyShelterInfo, MyVolInfo } from '@/api/mypage/mypage';
import useLogout from '@/api/mypage/useLogout';
import {
  ArrowRightLg,
  MypageChat,
  MypageStar,
  MypageTerms
} from '@/asset/icons';
import { Body1, ButtonText2 } from '@/components/common/Typography';
import useDialog from '@/hooks/useDialog';
import useHeader from '@/hooks/useHeader';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import * as styles from './MyPageMain.css';

export interface MyPageMainProps {
  isShelterRole: boolean;
  dangle_role: string;
}
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

export default function MyPageMain({
  isShelterRole,
  dangle_role
}: MyPageMainProps) {
  useHeader({ title: '내 정보' });
  const pathname = usePathname();
  const router = useRouter();

  const { dialogOn, dialogOff } = useDialog();
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

  const settings: SettingProps[] = [
    {
      label: '즐겨찾기 설정',
      link: pathname + '/volunteer/bookmark',
      Svg: MypageStar
    },
    { label: '문의하기', link: '', Svg: MypageChat },
    { label: '이용약관', link: '', Svg: MypageTerms }
  ];

  return (
    <div>
      <div className={styles.settingSection}>
        {settings.map(({ link, label, Svg }, index) => {
          if (index === 0 && isShelterRole) return null;

          return (
            <Link href={link} key={index}>
              <div className={styles.accountBox}>
                <div className={styles.accountTxt}>
                  <Svg />
                  <Body1>{label}</Body1>
                </div>
                <ArrowRightLg />
              </div>

              {index === 2 ? <div className={styles.divider} /> : null}
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
