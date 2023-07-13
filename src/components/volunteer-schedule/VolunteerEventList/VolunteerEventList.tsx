import VolunteerEventCard from '@/components/volunteer-schedule/VolunteerEventCard/VolunteerEventCard';
import { VolunteerEvent } from '../../../types/volunteerEvent';
import { H3 } from '../../common/Typography';
import { formatDate, isDateSame } from '@/utils/timeConvert';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Divider from '../../common/Divider/Divider';
import useObserver from '@/hooks/useObserver';
import { useIsFetching } from '@tanstack/react-query';
import { queryKey } from '@/api/shelter/volunteer-event';
import moment from 'moment';
interface VolunteerEventListProps {
  events: VolunteerEvent[];
  selectedDate: Date;
  shelterId: number;
}

const getDateHeaderElementId = (date: Date) =>
  'date-' + moment(date).format('YYYYMMDD');
const DateHeader = ({
  date,
  divider = true
}: {
  date: Date;
  divider?: boolean;
}) => (
  <div id={getDateHeaderElementId(date)}>
    {divider && <Divider spacing={16} />}
    <H3 style={{ marginBottom: '10px' }}>{formatDate(date)}</H3>
  </div>
);
const VolunteerEventList: React.FC<VolunteerEventListProps> = ({
  events,
  selectedDate,
  shelterId
}) => {
  const [prevSelectedDate, setPrevSelectedDate] = useState(selectedDate);
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

  const startAtList = useMemo(() => events?.map(e => e.startAt), [events]);

  const findNearestDate = useCallback(
    (date: Date) => {
      const nearestStartAt = [...startAtList].sort(
        (a, b) =>
          Math.abs(moment(a).diff(date, 'day')) -
          Math.abs(moment(b).diff(date, 'day'))
      )[0];
      console.log('🔸 → nearestStartAt:', nearestStartAt);
      return new Date(nearestStartAt);
    },
    [startAtList]
  );

  useEffect(() => {
    if (prevSelectedDate !== selectedDate && !isFetchingEvents) {
      const nearestDate = findNearestDate(selectedDate);
      const targetEl = document.getElementById(
        getDateHeaderElementId(nearestDate)
      );
      setPrevSelectedDate(selectedDate);
      console.log('🔸 → useEffect → targetEl:', targetEl);

      if (!targetEl) return;
      // TODO: 스크롤을 targetEl까지 내린다
    }
  }, [findNearestDate, isFetchingEvents, prevSelectedDate, selectedDate]);

  return (
    <div>
      {events?.map((event, idx) => (
        <div key={idx}>
          {idx === 0 && (
            <DateHeader date={new Date(event.startAt)} divider={false} />
          )}
          {idx > 0 && !isDateSame(events[idx - 1].startAt, event.startAt) && (
            <DateHeader date={new Date(event.startAt)} />
          )}
          <VolunteerEventCard style={{ marginBottom: '12px' }} event={event} />
        </div>
      ))}
      <div id="observer-target" style={{ height: 1, width: '100%' }} />
    </div>
  );
};

export default VolunteerEventList;
