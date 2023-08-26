'use client';
import useMyShelterEvent from '@/api/mypage/event/useMyShelterEvent';
import useMyInfo from '@/api/mypage/useMyInfo';
import ChipInput, { ChipOption } from '@/components/common/ChipInput/ChipInput';
import DeferredComponent from '@/components/common/Skeleton/DeferredComponent';
import SkeletonList from '@/components/common/Skeleton/SkeletonList';
import useEventFilter from '@/components/mypage/EventHistory/hooks/useEventFilter';
import useEventScroll from '@/components/mypage/EventHistory/hooks/useEventScroll';
import MyPageCard from '@/components/mypage/MyPageCard/MyPageCard';
import { isShelterInfo } from '@/components/mypage/MyPageMain/MyPageMain';
import useHeader from '@/hooks/useHeader';
import { palette } from '@/styles/color';
import uuidv4 from '@/utils/uuidv4';
import clsx from 'clsx';
import * as styles from './styles.css';
import { useMemo } from 'react';

export default function MyShelterEventPage({
  dangle_role
}: {
  dangle_role: string;
}) {
  useHeader({ title: '봉사 활동 조회', color: palette.white });

  const { shelterFilter, handleChipInput } = useEventFilter();
  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMyShelterEvent(shelterFilter);

  useEventScroll({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    shelterFilter
  });

  const STATUS_OPTIONS: ChipOption[] = [
    {
      label: `전체 ${
        isShelterInfo(info)
          ? info?.historyStat.done + info?.historyStat.inProgress
          : 0
      }`,
      value: ''
    },
    {
      label: `진행중 ${isShelterInfo(info) ? info?.historyStat.inProgress : 0}`,
      value: 'IN_PROGRESS'
    },
    {
      label: `종료 ${isShelterInfo(info) ? info?.historyStat.done : 0}`,
      value: 'DONE'
    }
  ];

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
          options={STATUS_OPTIONS}
          onChange={handleChipInput}
        />
      </div>

      {data && !isLoading ? (
        eventsHistory?.map(event => (
          <MyPageCard key={uuidv4()} event={event} isVolunteer={false} />
        ))
      ) : (
        <DeferredComponent>
          <SkeletonList />
        </DeferredComponent>
      )}
    </div>
  );
}
