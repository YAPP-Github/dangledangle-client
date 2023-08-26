import { MypageEvent } from '@/api/mypage/event/event';
import ChipInput, { ChipOption } from '@/components/common/ChipInput/ChipInput';
import DeferredComponent from '@/components/common/Skeleton/DeferredComponent';
import SkeletonList from '@/components/common/Skeleton/SkeletonList';
import MyPageCard from '@/components/mypage/MyPageCard/MyPageCard';
import uuidv4 from '@/utils/uuidv4';
import { InfiniteData } from '@tanstack/react-query';
import * as styles from './EventHistory.css';
import { ShelterFilter, VolunteerFilter } from './hooks/useEventFilter';
import clsx from 'clsx';
import { useMemo } from 'react';

interface EventHistoryProps {
  data: InfiniteData<MypageEvent>;
  isLoading: boolean;
  isVolunteer: boolean;
  shelterFilter: Record<string, VolunteerFilter | ShelterFilter>;
  options: ChipOption[];
  onChange: (name: string, value: string) => void;
}

export default function EventHistory({
  data,
  isLoading,
  isVolunteer,
  shelterFilter,
  options,
  onChange
}: EventHistoryProps) {
  const eventsHistory = useMemo(() => {
    const pages = data?.pages;
    return pages
      ?.flatMap(page => page.content)
      .sort(
        (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()
      );
  }, [data?.pages]);

  return (
    <div className={styles.eventContianer}>
      <div className={clsx([styles.chipContainer, 'admin-sticky'])}>
        <ChipInput
          name="status"
          value={shelterFilter.status}
          options={options}
          onChange={onChange}
        />
      </div>

      {data && !isLoading ? (
        eventsHistory.map(event => (
          <MyPageCard key={uuidv4()} event={event} isVolunteer={isVolunteer} />
        ))
      ) : (
        <DeferredComponent>
          <SkeletonList />
        </DeferredComponent>
      )}
    </div>
  );
}
