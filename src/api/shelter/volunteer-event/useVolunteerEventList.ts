import {
  UseInfiniteQueryOptions,
  useInfiniteQuery
} from '@tanstack/react-query';
import { GetListResponse, getList, queryKey } from '.';
import { Moment } from 'moment';
import moment from 'moment';
import {
  formatDatetimeForServer,
  getEndOfMonth,
  getStartOfMonth,
  minutes
} from '@/utils/timeConvert';
import { NUM_OF_MAX_ITERATION_MONTHS } from '@/constants/volunteerEvent';

export default function useVolunteerEventList(
  shelterId: number,
  from: Moment,
  to: Moment,
  options?: UseInfiniteQueryOptions<GetListResponse>
) {
  return useInfiniteQuery<GetListResponse>(
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
      ...options
    }
  );
}

export type UseVolunteerEventListPageParam = {
  to: Moment;
  from: Moment;
};

export const monthlyInfiniteOption: UseInfiniteQueryOptions<GetListResponse> = {
  getPreviousPageParam: (
    lastPage
  ): UseVolunteerEventListPageParam | undefined => {
    const prevDate = moment(lastPage.from).subtract(1, 'month');

    // NUM_OF_MAX_ITERATION_MONTHS개월 이전 데이터는 받아오지 않는다.
    const minDate = getStartOfMonth(new Date()).subtract(
      NUM_OF_MAX_ITERATION_MONTHS,
      'months'
    );
    if (prevDate.isBefore(minDate)) {
      return undefined;
    }

    return {
      from: getStartOfMonth(prevDate),
      to: getEndOfMonth(prevDate)
    };
  },
  getNextPageParam: (lastPage): UseVolunteerEventListPageParam | undefined => {
    const nextDate = moment(lastPage.from).add(1, 'month');

    // NUM_OF_MAX_ITERATION_MONTHS개월 이후 데이터는 받아오지 않는다.
    const maxDate = getStartOfMonth(new Date()).add(
      NUM_OF_MAX_ITERATION_MONTHS,
      'months'
    );
    if (nextDate.isAfter(maxDate)) {
      return undefined;
    }

    return {
      from: getStartOfMonth(nextDate),
      to: getEndOfMonth(nextDate)
    };
  }
};
