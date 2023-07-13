import VolunteerEventCard from '@/components/volunteer-schedule/VolunteerEventCard/VolunteerEventCard';
import { VolunteerEvent } from '../../../types/volunteerEvent';
import { H3 } from '../../common/Typography';
import { formatDate, isDateSame } from '@/utils/timeConvert';
import { useCallback, useEffect } from 'react';
import Divider from '../../common/Divider/Divider';
import useObserver from '@/hooks/useObserver';
import { useIsFetching } from '@tanstack/react-query';
import { queryKey } from '@/api/shelter/volunteer-event';
interface VolunteerEventListProps {
  events: VolunteerEvent[];
  selectedDate: Date;
  shelterId: number;
}

const DateHeader = ({
  date,
  divider = true
}: {
  date: string;
  divider?: boolean;
}) => (
  <div id={date}>
    {divider && <Divider spacing={16} />}
    <H3 style={{ marginBottom: '10px' }}>{formatDate(date)}</H3>
  </div>
);
const VolunteerEventList: React.FC<VolunteerEventListProps> = ({
  events,
  selectedDate,
  shelterId
}) => {
  const { attatchObserver, observe } = useObserver('observer-target');
  const isFetchingEvents = useIsFetching({
    queryKey: queryKey.list(shelterId)
  });

  const handleIntersect = useCallback(() => {
    console.log('데이터 받아오는 중');
    setTimeout(() => {
      console.log('데이터 패치 완료');
      // observe();
    }, 1000);
  }, [observe]);

  useEffect(() => {
    attatchObserver(handleIntersect);
  }, [attatchObserver, handleIntersect]);

  // useEffect(() => {
  //   if (focusedDate) {
  //     console.log(focusedDate);
  //     const targetEl = document.getElementById(focusedDate);
  //     if (!targetEl) return;

  //     targetEl.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, [focusedDate]);

  return (
    <div>
      {events?.map((event, idx) => (
        <div key={idx}>
          {idx === 0 && <DateHeader date={event.startAt} divider={false} />}
          {idx > 0 && !isDateSame(events[idx - 1].startAt, event.startAt) && (
            <DateHeader date={event.startAt} />
          )}
          <VolunteerEventCard style={{ marginBottom: '12px' }} event={event} />
        </div>
      ))}
      <div id="observer-target" style={{ height: 1, width: '100%' }} />
    </div>
  );
};

export default VolunteerEventList;
