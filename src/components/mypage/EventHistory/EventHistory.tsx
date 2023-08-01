import { MypageEvent } from '@/api/mypage/event/event';
import ChipInput, { ChipOption } from '@/components/common/ChipInput/ChipInput';
import DeferredComponent from '@/components/common/Skeleton/DeferredComponent';
import SkeletonList from '@/components/common/Skeleton/SkeletonList';
import MyPageCard from '@/components/mypage/MyPageCard/MyPageCard';
import uuidv4 from '@/utils/uuidv4';
import { InfiniteData } from '@tanstack/react-query';
import * as styles from './EventHistory.css';
import { ShelterFilter, VolunteerFilter } from './hooks/useEventFilter';

interface EventHistoryProps {
  data: InfiniteData<MypageEvent>;
  isLoading: boolean;
  shelterFilter: Record<string, VolunteerFilter | ShelterFilter>;
  options: ChipOption[];
  onChange: (name: string, value: string) => void;
}

export default function EventHistory({
  data,
  isLoading,
  shelterFilter,
  options,
  onChange
}: EventHistoryProps) {
  return (
    <div className={styles.eventContianer}>
      <div className={styles.chipContainer}>
        <ChipInput
          name="status"
          value={shelterFilter.status}
          options={options}
          onChange={onChange}
        />
      </div>

      {data && !isLoading ? (
        data.pages.flatMap(page =>
          page.content.map(event => (
            <MyPageCard key={uuidv4()} event={event} isVolunteer />
          ))
        )
      ) : (
        <DeferredComponent>
          <SkeletonList />
        </DeferredComponent>
      )}
    </div>
  );
}
