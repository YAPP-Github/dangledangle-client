import {
  MyShelterEvent,
  MyVolunteerEvent,
  MypageEvent
} from '@/api/mypage/event/event';
import { useScroll } from '@/hooks/useScroll';
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult
} from '@tanstack/query-core';
import { useEffect } from 'react';
import { ShelterFilter, VolunteerFilter } from './useEventFilter';

interface useEventScrollProps {
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      MypageEvent<MyShelterEvent | MyVolunteerEvent>,
      unknown
    >
  >;
  shelterFilter: Record<string, VolunteerFilter | ShelterFilter>;
}

export default function useEventScroll({
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  shelterFilter
}: useEventScrollProps) {
  const isNearBottom = useScroll(100, isFetchingNextPage);

  useEffect(() => {
    if (isNearBottom && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [isNearBottom, hasNextPage, fetchNextPage, isFetchingNextPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [shelterFilter]);

  return {};
}
