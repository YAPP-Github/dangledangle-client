'use client';
import clsx from 'clsx';
import ScheduleCard, {
  NoneScheduleCard,
  NoticeLoginScheduleCard
} from './ScheduleCard';
import * as styles from './UpcommingScheduleSection.css';
import { expandGlobalPadding } from '@/styles/global.css';
import { H3 } from '@/components/common/Typography';
import { useAuthContext } from '@/providers/AuthContext';
import useVolunteerEventList from '@/api/shelter/volunteer-event/useVolunteerEventList';
import moment from 'moment';
import { useMemo } from 'react';
import Skeleton from '@/components/common/Skeleton/Skeleton';
import useMyVolEvent from '@/api/mypage/event/useMyVolEvent';

export default function UpcommingScheduleSection() {
  const { dangle_role: role } = useAuthContext();

  return (
    <section className={clsx([expandGlobalPadding, styles.section])}>
      <H3> 봉사 일정이 다가오고 있어요 🐶</H3>
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
  const { data, isLoading } = useMyVolEvent({ page: 0, status: 'JOINING' });

  const volunteerEvents = useMemo(() => {
    const pages = data?.pages;
    return pages?.flatMap(page => page.content);
  }, [data?.pages]);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <>
      {volunteerEvents?.length ? (
        volunteerEvents?.map((item, i) => (
          <ScheduleCard
            {...item}
            key={`schedule_${i}_${item.volunteerEventId}`}
            userRole="VOLUNTEER"
            shelterId={item.shelterId!}
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
            {...item}
            shelterId={shelterId!}
            key={`schedule_${i}_${item.volunteerEventId}`}
            userRole="SHELTER"
          />
        ))
      ) : (
        <NoneScheduleCard />
      )}
    </>
  );
}
