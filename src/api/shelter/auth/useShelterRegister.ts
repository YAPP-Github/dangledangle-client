import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  registerShelter,
  ShelterRegisterPayload,
  ShelterRegisterResponse
} from './sign-up';
import { useAuthContext } from '@/providers/AuthContext';

export default function useShelterRegister() {
  const { setAuthState } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation<ShelterRegisterResponse, Error, ShelterRegisterPayload>(
    registerShelter,
    {
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
    }
  );
}
