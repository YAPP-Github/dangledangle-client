'use client';
import clsx from 'clsx';
import ScheduleCard, {
  NoneScheduleCard,
  NoticeLoginScheduleCard
} from './ScheduleCard';
import * as styles from './UpcommingScheduleSection.css';
import { expandGlobalPadding } from '@/styles/global.css';
import { H4 } from '@/components/common/Typography';
import { useAuthContext } from '@/providers/AuthContext';
import useVolunteerEventList from '@/api/shelter/volunteer-event/useVolunteerEventList';
import moment from 'moment';
import { useMemo } from 'react';
import Skeleton from '@/components/common/Skeleton/Skeleton';

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
  const { dangle_role: role } = useAuthContext();

  return (
    <section className={clsx([expandGlobalPadding, styles.section])}>
      <H4> 봉사 일정이 다가오고 있어요 🐶</H4>
      <div className={styles.cardList}>
        {role === 'NONE' ? (
          <NoticeLoginScheduleCard />
        ) : role === 'VOLUNTEER' ? (
          <VolunteerUserEventList />
        ) : role === 'SHELTER' ? (
          <ShelterUserEventList />
        ) : (
          <Skeleton />
        )}
      </div>
    </section>
  );
}

function VolunteerUserEventList() {
  const { dangle_id: volunteerId } = useAuthContext();

  // const volunteerEvents = useMemo(() => {
  //   const pages = data?.pages;
  //   return pages?.flatMap(page => page.events);
  // }, [data?.pages]);

  const volunteerEvents = mock;
  return (
    <>
      {volunteerEvents?.length ? (
        volunteerEvents?.map((item, i) => (
          <ScheduleCard
            shelterId={0} // api 연동 필요
            key={`schedule_${i}_${item.volunteerEventId}`}
            userRole="VOLUNTEER"
            {...item}
          />
        ))
      ) : (
        <NoneScheduleCard />
      )}
    </>
  );
}

function ShelterUserEventList() {
  const { dangle_id: shelterId } = useAuthContext();
  const { data, isLoading } = useVolunteerEventList(
    shelterId!,
    moment(),
    moment().add(2, 'week')
  );

  const volunteerEvents = useMemo(() => {
    const pages = data?.pages;
    return pages
      ?.flatMap(page => page.events)
      .sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      );
  }, [data?.pages]);

  if (isLoading) {
    return <Skeleton />;
  }
  return (
    <>
      {volunteerEvents?.length ? (
        volunteerEvents?.map((item, i) => (
          <ScheduleCard
            shelterId={shelterId!}
            key={`schedule_${i}_${item.volunteerEventId}`}
            userRole="SHELTER"
            {...item}
          />
        ))
      ) : (
        <NoneScheduleCard />
      )}
    </>
  );
}
