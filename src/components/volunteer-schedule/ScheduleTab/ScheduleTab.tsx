import VolunteerEventList from '@/components/volunteer-schedule/VolunteerEventList/VolunteerEventList';
import { volunteerEventsMock } from '@/components/volunteer-schedule/mock';
import * as styles from './ScheduleTab.css';
import DangleCalendar from '@/components/common/Calendar/DangleCalendar';
import { useCallback, useMemo, useState } from 'react';
import moment, { Moment } from 'moment';
interface ScheduleTabProps {}

const ScheduleTab: React.FC<ScheduleTabProps> = ({}) => {
  const [volunteerEvents, setVolunteerEvents] = useState(volunteerEventsMock);
  const [focusedDate, setFocusedDate] = useState<string>();

  const eventDates = useMemo(
    () => volunteerEvents.map(e => e.startAt),
    [volunteerEvents]
  );

  const findNearestEventDate = useCallback(
    (target: Moment) => {
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
    (value: Date) => {
      const nearestDate = findNearestEventDate(moment(value));
      setFocusedDate(nearestDate);
    },
    [findNearestEventDate]
  );

  return (
    <div>
      <DangleCalendar
        className={styles.calendar}
        mark={eventDates}
        onChange={handleChangeDate}
      />
      <div style={{ marginTop: '16px' }}>
        <VolunteerEventList
          focusedDate={focusedDate}
          events={volunteerEvents}
        />
      </div>
    </div>
  );
};

export default ScheduleTab;
