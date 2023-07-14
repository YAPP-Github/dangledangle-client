import {
  UseMutationOptions,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { queryKey } from '../admin/volunteer-event';
import { VolEventWithdraw, withdraw } from './volunteer-event';

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
        options?.onSuccess && options.onSuccess(data, variables, context);
        return queryClient.invalidateQueries(
          queryKey.detail(variables.volunteerEventId)
        );
      },
      ...options
    }
  );
}
