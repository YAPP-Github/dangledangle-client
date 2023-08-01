import { post } from '@/api/shelter/{shelterId}/bookmark';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKey } from './bookmark';

export default function useDeleteBookmark() {
  const queryClient = useQueryClient();
  return useMutation(post, {
    onSuccess: () => {
      return queryClient.invalidateQueries(queryKey.all);
    }
  });
}
