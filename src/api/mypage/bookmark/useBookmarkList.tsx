import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { Bookmark, getMyBookmark, queryKey } from './bookmark';

export default function useBookmarkList(options?: UseQueryOptions<Bookmark>) {
  return useQuery<Bookmark>(queryKey.all, getMyBookmark, {
    ...options
  });
}
