import VolunteerEventCard from '@/components/volunteer-schedule/VolunteerEventCard/VolunteerEventCard';
import { VolunteerEvent } from '../../../types/volunteerEvent';
import { H3 } from '../../common/Typography';
import { formatDate, isDateSame } from '@/utils/timeConvert';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Divider from '../../common/Divider/Divider';
import useObserver from '@/hooks/useObserver';
import moment from 'moment';
import { palette } from '@/styles/color';

interface VolunteerEventListProps {
  events: VolunteerEvent[];
  selectedDate: Date;
  scrollTo: (eventCardEl: HTMLElement) => void;
  fetchNextEvents: () => Promise<{ hasNext: boolean }>;
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
    <Divider
      style={!divider ? { backgroundColor: palette.background } : undefined}
      spacing={16}
    />
    <H3 style={{ marginBottom: '10px' }}>{formatDate(date)}</H3>
  </div>
);
const VolunteerEventList: React.FC<VolunteerEventListProps> = ({
  events,
  selectedDate,
  scrollTo,
  fetchNextEvents
}) => {
  const [prevSelectedDate, setPrevSelectedDate] = useState(selectedDate);
  const { observe } = useObserver('observer-target');

  const handleIntersect = useCallback(async () => {
    const result = await fetchNextEvents();
    result.hasNext && observe(handleIntersect);
  }, [fetchNextEvents, observe]);

  useEffect(() => {
    const isAttatched = observe(handleIntersect);
    if (!isAttatched) setTimeout(() => observe(handleIntersect), 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (prevSelectedDate !== selectedDate) {
      const nearestDate = findNearestDate(selectedDate);
      const dateHeaderEl = document.getElementById(
        getDateHeaderElementId(nearestDate)
      );
      setPrevSelectedDate(selectedDate);
      console.log('🔸 → useEffect → targetEl:', dateHeaderEl);

      if (!dateHeaderEl || !dateHeaderEl.parentElement) return;
      scrollTo(dateHeaderEl.parentElement);
    }
  }, [findNearestDate, prevSelectedDate, scrollTo, selectedDate]);

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
