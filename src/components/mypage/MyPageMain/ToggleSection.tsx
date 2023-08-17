'use client';

import { MypageNoti } from '@/asset/icons';
import * as styles from './MyPageMain.css';
import { Body1, Caption3 } from '@/components/common/Typography';
import ToggleSwitch from '@/components/common/ToggleSwitch/ToggleSwitch';
import useMyInfo from '@/api/mypage/useMyInfo';
import { MyPageMainProps, isShelterInfo } from './MyPageMain';
import useUpdateVolInfo from '@/api/mypage/useUpdateVolInfo';
import useUpdateShelterAlarm from '@/api/mypage/useUpdateShelterAlarm';
import useToast from '@/hooks/useToast';
import { useCallback } from 'react';

export default function ToggleSection({
  isShelterRole,
  dangle_role
}: MyPageMainProps) {
  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });

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

  return (
    <div className={styles.settingSection}>
      <div className={styles.accountBox}>
        <div className={styles.accountTxt}>
          <MypageNoti />
          <Body1>카카오톡 알림 설정</Body1>
        </div>

        <ToggleSwitch
          name={'alram'}
          onChange={handleToggleChange}
          checked={info?.alarmEnabled}
        />
      </div>
      <Caption3 color="gray600" className={styles.noti}>
        {NOTI}
      </Caption3>
      <div className={styles.divider} />
    </div>
  );
}
