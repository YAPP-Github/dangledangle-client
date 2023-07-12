import { VolunteerEvent } from '@/types/volunteerEvent';
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery
} from '@tanstack/react-query';
import { getList, queryKey } from '.';
import { Moment } from 'moment';
import moment from 'moment';
import {
  formatDatetimeForServer,
  getEndOfMonth,
  getStartOfMonth,
  minutes
} from '@/utils/timeConvert';

export default function useVolunteerEventList(
  shelterId: number,
  from: Moment,
  to: Moment,
  options?: UseInfiniteQueryOptions<VolunteerEvent[]>
) {
  return useInfiniteQuery<VolunteerEvent[]>(
    queryKey.list(shelterId),
    ({
      pageParam = {
        from,
        to
      }
    }) =>
      getList({
        shelterId,
        from: formatDatetimeForServer(pageParam.from, 'DATE'),
        to: formatDatetimeForServer(pageParam.to, 'DATE')
      }),
    {
      cacheTime: minutes(10),
      ...options,
      keepPreviousData: true
    }
  );
}

export type UseVolunteerEventListPageParam = {
  to: Moment;
  from: Moment;
};

export const monthlyInfiniteOption: UseInfiniteQueryOptions<VolunteerEvent[]> =
  {
    getPreviousPageParam: (lastPage): UseVolunteerEventListPageParam => {
      const prevDate = moment(lastPage[0].startAt).subtract(1, 'month');
      return {
        from: getStartOfMonth(prevDate),
        to: getEndOfMonth(prevDate)
      };
    },
    getNextPageParam: (lastPage): UseVolunteerEventListPageParam => {
      const nextDate = moment(lastPage[0].startAt).add(1, 'month');
      return {
        from: getStartOfMonth(nextDate),
        to: getEndOfMonth(nextDate)
      };
    }
  };
