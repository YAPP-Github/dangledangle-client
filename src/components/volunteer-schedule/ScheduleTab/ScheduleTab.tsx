import VolunteerEventList from '@/components/volunteer-schedule/VolunteerEventList/VolunteerEventList';
import * as styles from './ScheduleTab.css';
import DangleCalendar from '@/components/common/Calendar/DangleCalendar';
import { useCallback, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
import useVolunteerEventList, {
  monthlyInfiniteOption
} from '@/api/shelter/volunteer-event/useVolunteerEventList';
import { getStartOfMonth, getEndOfMonth } from '@/utils/timeConvert';

interface ScheduleTabProps {
  shelterId: number;
}

const ScheduleTab: React.FC<ScheduleTabProps> = ({ shelterId }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const query = useVolunteerEventList(
    shelterId,
    getStartOfMonth(new Date()),
    getEndOfMonth(new Date()),
    { ...monthlyInfiniteOption }
  );

  const volunteerEvents = useMemo(() => {
    const pages = query.data?.pages;
    return pages?.flatMap(page => page.events);
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

  const handleClickDate = useCallback((value: Date) => {
    setSelectedDate(value);
  }, []);

  const handleChangeMonth = useCallback(
    async (value: Date) => {
      const newMonth = moment(value).month();
      const prevMonth = moment(selectedDate).month();

      if (newMonth > prevMonth) {
        await query.fetchNextPage();
        console.log('fetch next month');
      } else if (newMonth < prevMonth) {
        await query.fetchPreviousPage();
        console.log('fetch prev month');
      }
    },
    [query, selectedDate]
  );

  return (
    <div>
      <DangleCalendar
        className={styles.calendar}
        mark={eventDates}
        onChange={handleClickDate}
        onChangeMonth={handleChangeMonth}
      />
      <div style={{ marginTop: '16px' }}>
        {volunteerEvents && (
          <VolunteerEventList
            selectedDate={selectedDate}
            events={volunteerEvents}
            shelterId={shelterId}
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleTab;
