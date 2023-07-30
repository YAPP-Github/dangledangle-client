// 상태 - 로그인 x | 일정 없음 | 일정 있음
// 색상 변경 - 맨 앞에 카드
// 크기 변경 - 하나만 있을때 꽉 채우기
//  모집중, 모집 종료

import {
  Caption1,
  Caption2,
  Caption3,
  H4
} from '@/components/common/Typography';
import { UserRole } from '@/constants/user';
import {
  formatKoDate,
  getDuration,
  getLocaleWeekday,
  pmamConvert
} from '@/utils/timeConvert';
import * as styles from './ScheduleCard.css';
import { PropsWithChildren } from 'react';

interface ScheduleCardProps {
  selected?: boolean;
  userRole: UserRole;
  shelterId: number;
  startAt: Date | string;
  endAt: Date | string;
  title: string;
  recruitNum: number;
  joinNum: number;
  waitingNum: number;
}

export default function ScheduleCard({
  selected,
  userRole,
  shelterId,
  startAt,
  endAt,
  title,
  recruitNum,
  joinNum,
  waitingNum
}: ScheduleCardProps) {
  const eventDay = `${formatKoDate(startAt)} ${getLocaleWeekday(startAt)}`;
  const duringTime = `${pmamConvert(startAt)} ${pmamConvert(
    endAt
  )} (${getDuration(startAt, endAt)})`;
  return (
    <article className={styles.container}>
      <div className={styles.timeInfo}>
        <Day>{eventDay}</Day>
        <Duringtime>{`${duringTime}`}</Duringtime>
      </div>
      <Title>{title}</Title>
      <div className={styles.bottomInfo}>
        {userRole === 'SHELTER' && <ShelterProfile>아지네마을</ShelterProfile>}
        <Waiting>
          {joinNum}/{recruitNum}명{waitingNum > 0 && `(대기 ${waitingNum}명)`}
        </Waiting>
      </div>
    </article>
  );
}

const Day = ({ children }: PropsWithChildren) => (
  <Caption1 className={styles.firstCardVariation}>{children}</Caption1>
);

const Duringtime = ({ children }: PropsWithChildren) => (
  <Caption3 className={styles.firstCardVariation}>{children}</Caption3>
);
const Title = ({ children }: PropsWithChildren) => (
  <H4 className={styles.title}>{children}</H4>
);
const ShelterProfile = ({ children }: PropsWithChildren) => (
  <Caption2 className={styles.firstCardVariation}>{children}</Caption2>
);
const Waiting = ({ children }: PropsWithChildren) => (
  <Caption1 className={styles.firstCardVariation}>{children}</Caption1>
);
