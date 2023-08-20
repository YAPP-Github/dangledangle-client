import {
  UseInfiniteQueryOptions,
  useInfiniteQuery
} from '@tanstack/react-query';
import {
  MyVolunteerEvent,
  MypageEvent,
  MypageEventParams,
  getMyVolEvent,
  queryKey
} from './event';

export default function useMyVolEvent(
  filter?: MypageEventParams,
  options?: UseInfiniteQueryOptions<MypageEvent<MyVolunteerEvent>>
) {
  return useInfiniteQuery<MypageEvent<MyVolunteerEvent>>(
    [...queryKey.all, JSON.stringify(filter)],
    ({ pageParam = 0 }) => getMyVolEvent({ ...filter, page: pageParam }),
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
