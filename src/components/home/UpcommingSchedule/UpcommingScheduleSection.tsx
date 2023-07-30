import clsx from 'clsx';
import ScheduleCard from './ScheduleCard';
import * as styles from './UpcommingScheduleSection.css';
import { expandGlobalPadding } from '@/styles/global.css';
import { H4 } from '@/components/common/Typography';
const mock = [
  {
    volunteerEventId: 1,
    category: 'WALKING',
    title:
      '태평역 인근 산책산책산책산책산책산책산책산책산책산책산책 봉사자 모집합니다.',
    eventStatus: 'IN_PROGRESS',
    myParticipationStatus: 'NONE',
    startAt: '2023-07-30 15:00:00',
    endAt: '2023-07-30 17:38:02',
    recruitNum: 1,
    joinNum: 0,
    waitingNum: 0
  },
  {
    volunteerEventId: 2,
    category: 'WALKING',
    title:
      '태평역 인근 산책 봉사자봉사자봉사자봉사자봉사자봉사자봉사자 모집합니다.',
    eventStatus: 'IN_PROGRESS',
    myParticipationStatus: 'NONE',
    startAt: '2023-07-31 15:03:38',
    endAt: '2023-07-31 17:38:02',
    recruitNum: 1,
    joinNum: 0,
    waitingNum: 0
  },
  {
    volunteerEventId: 2,
    category: 'WALKING',
    title:
      '태평역 인근 산책 봉사자봉사자봉사자봉사자봉사자봉사자봉사자 모집합니다.',
    eventStatus: 'IN_PROGRESS',
    myParticipationStatus: 'NONE',
    startAt: '2023-07-31 15:03:38',
    endAt: '2023-07-31 17:38:02',
    recruitNum: 1,
    joinNum: 0,
    waitingNum: 0
  },
  {
    volunteerEventId: 2,
    category: 'WALKING',
    title:
      '태평역 인근 산책 봉사자봉사자봉사자봉사자봉사자봉사자봉사자 모집합니다.',
    eventStatus: 'IN_PROGRESS',
    myParticipationStatus: 'NONE',
    startAt: '2023-07-31 15:03:38',
    endAt: '2023-07-31 17:38:02',
    recruitNum: 1,
    joinNum: 0,
    waitingNum: 0
  }
];

export default function UpcommingScheduleSection() {
  return (
    <section className={clsx([styles.section, expandGlobalPadding])}>
      <H4 className={styles.sectionTitle}>봉사 일정이 다가오고 있어요 🐶</H4>
      <div className={styles.cardList}>
        {mock.map(item => (
          <ScheduleCard
            key={`schedule_${item.volunteerEventId}`}
            userRole="SHELTER"
            shelterId={1}
            {...item}
          />
        ))}
      </div>
    </section>
  );
}
