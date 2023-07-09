import VolunteerEventCard, {
  VolunteerEvent
} from '@/components/volunteer-schedule/VolunteerEventCard/VolunteerEventCard';
import { H3 } from '../../common/Typography';
import { formatDate, isDateSame } from '@/utils/timeConvert';
import { useCallback, useEffect } from 'react';
import Divider from '../../common/Divider/Divider';
import useObserver from '@/hooks/useObserver';
interface VolunteerEventListProps {
  events: VolunteerEvent[];
  focusedDate?: string;
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
  focusedDate
}) => {
  const { attatchObserver, observe } = useObserver();
  const handleIntersect = useCallback(() => {
    console.log('데이터 받아오는 중');
    setTimeout(() => {
      console.log('데이터 패치 완료');
      // observe();
    }, 1000);
  }, [observe]);

  useEffect(() => {
    attatchObserver('observer-target', handleIntersect);
  }, [attatchObserver, handleIntersect]);

  useEffect(() => {
    if (focusedDate) {
      console.log(focusedDate);
      const targetEl = document.getElementById(focusedDate);
      if (!targetEl) return;

      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, [focusedDate]);

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
