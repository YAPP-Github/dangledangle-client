import {
  UseInfiniteQueryOptions,
  useInfiniteQuery
} from '@tanstack/react-query';
import {
  MyShelterEvent,
  MypageEvent,
  MypageEventParams,
  getMyShelterEvent,
  queryKey
} from './event';

export default function useMyShelterEvent(
  filter?: MypageEventParams,
  options?: UseInfiniteQueryOptions<MypageEvent<MyShelterEvent>>
) {
  return useInfiniteQuery<MypageEvent<MyShelterEvent>>(
    [...queryKey.all, JSON.stringify(filter)],
    ({ pageParam = 0 }) => getMyShelterEvent({ ...filter, page: pageParam }),
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
