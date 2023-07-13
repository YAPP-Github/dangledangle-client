import VolunteerEventList from '@/components/volunteer-schedule/VolunteerEventList/VolunteerEventList';
import * as styles from './ScheduleTab.css';
import DangleCalendar from '@/components/common/Calendar/DangleCalendar';
import { useCallback, useMemo, useState } from 'react';
import moment from 'moment';
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

  const handleClickDate = useCallback((value: Date) => {
    setSelectedDate(value);
  }, []);

  const handleChangeMonth = useCallback(
    // month 변경 시 해당 월에 해당하는 데이터 패치
    async (value: Date) => {
      const newDate = getEndOfMonth(value);
      const prevDate = getEndOfMonth(selectedDate);

      if (newDate.isAfter(prevDate)) {
        await query.fetchNextPage();
        console.log('fetch next month');
      } else if (newDate.isBefore(prevDate)) {
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
