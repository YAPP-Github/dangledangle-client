import {
  UseInfiniteQueryOptions,
  useInfiniteQuery
} from '@tanstack/react-query';
import { Moment } from 'moment';
import moment from 'moment';
import {
  formatDatetimeForServer,
  getEndOfMonth,
  getStartOfMonth,
  minutes
} from '@/utils/timeConvert';
import { NUM_OF_MAX_ITERATION_MONTHS } from '@/constants/volunteerEvent';
import { GetResponse, HomeEventFilter, shelterGet, queryKey } from '.';

export default function useShelterHomeEventList(
  filter: HomeEventFilter,
  from: Moment,
  to: Moment,
  options?: UseInfiniteQueryOptions<GetResponse>
) {
  const filterForKey = {
    ...filter
  };
  delete filterForKey.latitude;
  delete filterForKey.longitude;
  return useInfiniteQuery<GetResponse>(
    queryKey.list(filterForKey),
    ({
      pageParam = {
        from,
        to
      }
    }) =>
      shelterGet(
        filter,
        formatDatetimeForServer(pageParam.from, 'DATE'),
        formatDatetimeForServer(pageParam.to, 'DATE')
      ),
    {
      cacheTime: minutes(10),
      ...options
    }
  );
}
