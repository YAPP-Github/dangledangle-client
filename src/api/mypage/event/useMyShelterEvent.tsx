import {
  UseInfiniteQueryOptions,
  useInfiniteQuery
} from '@tanstack/react-query';
import { MypageEvent, MypageEventParams, getMyEvent, queryKey } from './event';

export default function useMyShelterEvent(
  filter?: MypageEventParams,
  options?: UseInfiniteQueryOptions<MypageEvent>
) {
  return useInfiniteQuery<MypageEvent>(
    [...queryKey.all],
    ({ pageParam = 0 }) => getMyEvent({ ...filter, page: pageParam }),
    {
      getNextPageParam: lastPage => {
        if (lastPage.content.length === 0) {
          return false;
        }
        return lastPage.pageNumber + 1;
      },
      ...options
    }
  );
}
