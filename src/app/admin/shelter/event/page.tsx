'use client';
import useMyShelterEvent from '@/api/mypage/event/useMyShelterEvent';
import useMyInfo from '@/api/mypage/useMyInfo';
import ChipInput, { ChipOption } from '@/components/common/ChipInput/ChipInput';
import SkeletonList from '@/components/common/Skeleton/SkeletonList';
import MyPageCard from '@/components/mypage/MyPageCard/MyPageCard';
import useHeader from '@/hooks/useHeader';
import { useScroll } from '@/hooks/useScroll';
import { useAuthContext } from '@/providers/AuthContext';
import { palette } from '@/styles/color';
import uuidv4 from '@/utils/uuidv4';
import { useCallback, useEffect, useState } from 'react';
import { isShelterInfo } from '../../page';
import * as styles from './styles.css';

export type ShelterFilter = 'IN_PROGRESS' | 'DONE' | '';

export default function ShelterEvent() {
  useHeader({ title: '봉사 활동 조회', color: palette.white });
  const { dangle_role } = useAuthContext();

  const [shelterFilter, setShelterFilter] = useState<
    Record<string, ShelterFilter>
  >({
    status: ''
  });
  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMyShelterEvent(shelterFilter);
  const isNearBottom = useScroll(100, isFetchingNextPage);

  useEffect(() => {
    if (isNearBottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isNearBottom, hasNextPage, fetchNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [shelterFilter]);

  const handleChipInput = useCallback((name: string, value: string) => {
    let status = value as ShelterFilter;
    setShelterFilter(shelterFilter => ({ ...shelterFilter, [name]: status }));
  }, []);

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

  return (
    <div className={styles.contianer}>
      <div className={styles.chipContainer}>
        <ChipInput
          name="status"
          value={shelterFilter.status}
          options={STATUS_OPTIONS}
          onChange={handleChipInput}
        />
      </div>

      {data && !isLoading ? (
        data.pages.flatMap(page =>
          page.content.map(event => <MyPageCard key={uuidv4()} event={event} />)
        )
      ) : (
        <SkeletonList />
      )}
    </div>
  );
}
