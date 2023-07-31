'use client';
import useMyVolEvent from '@/api/mypage/event/useMyVolEvent';
import useMyInfo from '@/api/mypage/useMyInfo';
import ChipInput, { ChipOption } from '@/components/common/ChipInput/ChipInput';
import useHeader from '@/hooks/useHeader';
import { useScroll } from '@/hooks/useScroll';
import { useAuthContext } from '@/providers/AuthContext';
import { palette } from '@/styles/color';
import { useCallback, useEffect, useState } from 'react';
import { isShelterInfo } from '../../page';
import * as styles from './styles.css';
import MyPageCard from '@/components/mypage/MyPageCard/MyPageCard';
import uuidv4 from '@/utils/uuidv4';
import DeferredComponent from '@/components/common/Skeleton/DeferredComponent';
import SkeletonList from '@/components/common/Skeleton/SkeletonList';

interface MyVolEventPageProps {}

export type VolunteerFilter = 'NONE' | 'JOINING' | 'WAITING' | 'DONE' | '';

export default function MyVolEventPage({}: MyVolEventPageProps) {
  useHeader({ title: '봉사 활동 조회', color: palette.white });
  const { dangle_role } = useAuthContext();

  const [shelterFilter, setShelterFilter] = useState<
    Record<string, VolunteerFilter>
  >({
    status: ''
  });
  const { data: info } = useMyInfo(dangle_role, {
    enabled: !!dangle_role && dangle_role !== 'NONE'
  });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMyVolEvent(shelterFilter);
  const isNearBottom = useScroll(100, isFetchingNextPage);

  useEffect(() => {
    if (isNearBottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isNearBottom, hasNextPage, fetchNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [shelterFilter]);

  const handleChipInput = useCallback((name: string, value: string) => {
    let status = value as VolunteerFilter;
    setShelterFilter(shelterFilter => ({ ...shelterFilter, [name]: status }));
  }, []);

  const STATUS_OPTIONS: ChipOption[] = [
    {
      label: `전체 ${
        !isShelterInfo(info)
          ? (info?.historyStat.joining ?? 0) +
            (info?.historyStat.waiting ?? 0) +
            (info?.historyStat.done ?? 0)
          : 0
      }`,
      value: ''
    },
    {
      label: `신청 ${
        !isShelterInfo(info) ? info?.historyStat.joining ?? 0 : 0
      }`,
      value: 'JOINING'
    },
    {
      label: `대기 ${
        !isShelterInfo(info) ? info?.historyStat.waiting ?? 0 : 0
      }`,
      value: 'WAITING'
    },
    {
      label: `이력 ${!isShelterInfo(info) ? info?.historyStat.done ?? 0 : 0}`,
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
