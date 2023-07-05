import Calendar from '@/components/common/Calendar/Calendar';
import VolunteerEventList from '@/components/volunteer-schedule/VolunteerEventList/VolunteerEventList';
import { volunteerEventsMock } from '@/components/volunteer-schedule/mock';

interface ScheduleTabProps {}

const ScheduleTab: React.FC<ScheduleTabProps> = ({}) => {
  return (
    <div>
      <Calendar />
      <div style={{ marginTop: '16px' }}>
        <VolunteerEventList events={volunteerEventsMock} />
      </div>
    </div>
  );
};

export default ScheduleTab;
