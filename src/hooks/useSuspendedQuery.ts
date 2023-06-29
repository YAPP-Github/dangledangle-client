import { QueryFunction, QueryKey } from '@tanstack/query-core';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

interface SuspendedUseQueryOptions<
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends QueryKey
> extends UseQueryOptions<TQueryFnData, TError, TData, TQueryKey> {
  suspense: boolean;
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
) {
  return useQuery<TQueryFnData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    ...options,
    suspense: true
  });
}
