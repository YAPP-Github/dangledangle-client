import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerShelter, signUpPayload, signUpResponse } from './sign-up';
import { useAuthContext } from '@/providers/AuthContext';

export default function useShelterRegister() {
  const { setAuthState } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<signUpResponse, Error, signUpPayload>(registerShelter, {
    onSuccess: response => {
      if ('shelterId' in response) {
        setAuthState(prev => ({
          ...prev,
          user: {
            ...prev.user,
            shelterId: response.shelterId,
            shelterUserId: response.shelterUserId
          }
        }));
        return queryClient.invalidateQueries(['register']);
      } else {
        console.error(response);
      }
    }
  });
}
