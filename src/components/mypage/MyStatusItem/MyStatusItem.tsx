'use client';
import { Body3, H3 } from '@/components/common/Typography';
import * as styles from './MyStatusItem.css';
import useMyInfo from '@/api/mypage/useMyInfo';
import { useAuthContext } from '@/providers/AuthContext';
import { isShelterInfo } from '@/app/admin/page';

export default function MyStatusItem() {
  const { dangle_role } = useAuthContext();
  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });

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
    <div className={styles.box}>
      {myStatus.map(({ value, cnt }, index) => (
        <section style={{ display: 'flex' }} key={index}>
          <div className={styles.txtGird}>
            <H3>{cnt}</H3>
            <Body3>{value}</Body3>
          </div>
          {index < myStatus.length - 1 && <div className={styles.stroke} />}
        </section>
      ))}
    </div>
  );
}
