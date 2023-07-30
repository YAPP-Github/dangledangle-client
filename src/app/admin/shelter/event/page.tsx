'use client';
import MyPageCard from '@/components/mypage/MyPageCard/MyPageCard';
import useHeader from '@/hooks/useHeader';
import { palette } from '@/styles/color';
import * as styles from './styles.css';
import useMyShelterEvent from '@/api/mypage/event/useMyShelterEvent';
import uuidv4 from '@/utils/uuidv4';
import SkeletonList from '@/components/common/Skeleton/SkeletonList';
import { useScroll } from '@/hooks/useScroll';
import { useEffect } from 'react';

export default function ShelterEvent() {
  useHeader({ title: '봉사 활동 조회', color: palette.white });

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useMyShelterEvent();
  const isNearBottom = useScroll(100, isFetchingNextPage);

  useEffect(() => {
    if (isNearBottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isNearBottom, hasNextPage, fetchNextPage, isFetchingNextPage]);

  return (
    <div className={styles.contianer}>
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
