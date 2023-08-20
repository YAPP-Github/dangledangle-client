import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { VolEventWithdraw, withdraw } from './volunteer-event';
import { queryKey } from '../volunteer-event';

export type PostVolEventWidthdrawParams = {
  shelterId: number;
  volunteerEventId: number;
};
export default function useWithdrawVolEvent(
  options?: UseMutationOptions<
    VolEventWithdraw,
    unknown,
    PostVolEventWidthdrawParams
  >
) {
  const queryClient = useQueryClient();
  return useMutation<VolEventWithdraw, Error, PostVolEventWidthdrawParams>(
    ({ shelterId, volunteerEventId }) => withdraw(shelterId, volunteerEventId),
    {
      onSuccess: (data, variables, context) => {
        return queryClient.invalidateQueries({
          queryKey: queryKey.all,
          refetchType: 'all'
        });
      },
      ...options
    }
  );
}
