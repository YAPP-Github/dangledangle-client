'use client';

import { Body3, Caption2, H3 } from '@/components/common/Typography';
import * as styles from './MyPageMain.css';
import { MyPageMainProps, isShelterInfo } from './MyPageMain';
import useMyInfo from '@/api/mypage/useMyInfo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from '@/asset/icons';
import { assignInlineVars } from '@vanilla-extract/dynamic';

export default function MyPageHistory({
  isShelterRole,
  dangle_role
}: MyPageMainProps) {
  const pathname = usePathname();
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
                <Body3 style={{ whiteSpace: 'nowrap' }}>{value}</Body3>
              </div>
              {index < myStatus.length - 1 && (
                <div
                  className={styles.stroke}
                  style={assignInlineVars({
                    [styles.space]: isShelterRole ? '40px' : '22px'
                  })}
                />
              )}
            </section>
          ))}
        </div>
      </Link>
    </main>
  );
}
