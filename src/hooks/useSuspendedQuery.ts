import { QueryFunction, QueryKey } from '@tanstack/query-core';
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery
} from '@tanstack/react-query';

interface SuspendedUseQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey
> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  suspense: true;
}

export interface BaseSuspendedUseQueryResult<TData>
  extends Omit<
    UseQueryResult<TData>,
    'error' | 'isLoading' | 'isError' | 'isFetching' | 'status'
  > {
  data: TData;
  status: 'success' | 'idle';
}

export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<
    SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
): BaseSuspendedUseQueryResult<TData> {
  const queryResult = useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options,
    suspense: true
  });

  return {
    ...queryResult,
    data: queryResult.data as TData,
    status: queryResult.status
  } as BaseSuspendedUseQueryResult<TData>;
}
