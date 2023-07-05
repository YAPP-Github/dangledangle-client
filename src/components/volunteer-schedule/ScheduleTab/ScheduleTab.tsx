import Calendar from '@/components/common/Calendar/Calendar';
import VolunteerEventList from '@/components/volunteer-schedule/VolunteerEventList/VolunteerEventList';
import { volunteerEventsMock } from '@/components/volunteer-schedule/mock';
import * as styles from './ScheduleTab.css';
import DangleCalendar from '@/components/common/Calendar/DangleCalendar';
interface ScheduleTabProps {}

const ScheduleTab: React.FC<ScheduleTabProps> = ({}) => {
  return (
    <div>
      <DangleCalendar
        className={styles.calendar}
        mark={volunteerEventsMock.map(e => e.date)}
      />
      <div style={{ marginTop: '16px' }}>
        <VolunteerEventList events={volunteerEventsMock} />
      </div>
    </div>
  );
};

export default ScheduleTab;
