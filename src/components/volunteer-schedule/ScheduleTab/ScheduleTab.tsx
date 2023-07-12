import VolunteerEventList from '@/components/volunteer-schedule/VolunteerEventList/VolunteerEventList';
import * as styles from './ScheduleTab.css';
import DangleCalendar from '@/components/common/Calendar/DangleCalendar';
import { useCallback, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import useVolunteerEventList, {
  monthlyInfiniteOption
} from '@/api/shelter/volunteer-event/useVolunteerEventList';
import {
  getStartOfMonth,
  getEndOfMonth,
  formatDatetimeForServer
} from '@/utils/timeConvert';

interface ScheduleTabProps {
  shelterId: number;
}

const ScheduleTab: React.FC<ScheduleTabProps> = ({ shelterId }) => {
  const [focusedDate, setFocusedDate] = useState<string | undefined>(
    formatDatetimeForServer(new Date(), 'DATE')
  );
  const query = useVolunteerEventList(
    shelterId,
    getStartOfMonth(new Date()),
    getEndOfMonth(new Date()),
    { ...monthlyInfiniteOption }
  );

  const volunteerEvents = useMemo(() => {
    const pages = query.data?.pages;
    return pages?.flat();
  }, [query.data?.pages]);

  const eventDates = useMemo(
    () => volunteerEvents?.map(e => moment(e.startAt).format('YYYY-MM-DD')),
    [volunteerEvents]
  );

  const findNearestEventDate = useCallback(
    (target: Moment) => {
      if (!eventDates) return undefined;
      const nearestDate = [...eventDates].sort(
        (a, b) =>
          Math.abs(moment(a).diff(target, 'day')) -
          Math.abs(moment(b).diff(target, 'day'))
      )[0];
      console.log(nearestDate);
      return nearestDate;
    },
    [eventDates]
  );

  const handleChangeDate = useCallback(
    async (value: Date) => {
      if (getStartOfMonth(value).isAfter(value)) {
        await query.fetchNextPage();
      } else if (getEndOfMonth(value).isBefore(value)) {
        await query.fetchPreviousPage();
      }

      const nearestDate = findNearestEventDate(moment(value));
      setFocusedDate(nearestDate);
    },
    [findNearestEventDate, query]
  );

  return (
    <div>
      <DangleCalendar
        className={styles.calendar}
        mark={eventDates}
        onChange={handleChangeDate}
      />
      <div style={{ marginTop: '16px' }}>
        {volunteerEvents && (
          <VolunteerEventList
            focusedDate={focusedDate}
            events={volunteerEvents}
            loadMoreEvents={query.fetchNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleTab;
