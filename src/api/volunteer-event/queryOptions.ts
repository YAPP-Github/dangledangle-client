import { NUM_OF_MAX_ITERATION_MONTHS } from '@/constants/volunteerEvent';
import { getStartOfMonth, getEndOfMonth } from '@/utils/timeConvert';
import { UseInfiniteQueryOptions } from '@tanstack/react-query';
import moment, { Moment } from 'moment';
import { GetResponse } from '.';

export type UseVolunteerEventListPageParam = {
  to: Moment;
  from: Moment;
};

export const monthlyInfiniteOption: UseInfiniteQueryOptions<GetResponse> = {
  getPreviousPageParam: (
    lastPage
  ): UseVolunteerEventListPageParam | undefined => {
    const prevDate = moment(lastPage.from).subtract(1, 'month');

    // NUM_OF_MAX_ITERATION_MONTHS개월 이전 데이터는 받아오지 않는다.
    const minDate = getStartOfMonth(new Date()).subtract(
      NUM_OF_MAX_ITERATION_MONTHS,
      'months'
    );
    if (prevDate.isSameOrBefore(minDate)) {
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

    if (nextDate.isSameOrAfter(maxDate)) {
      return undefined;
    }

    return {
      from: getStartOfMonth(nextDate),
      to: getEndOfMonth(nextDate)
    };
  }
};
