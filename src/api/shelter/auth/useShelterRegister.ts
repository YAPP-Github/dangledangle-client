import { useMutation } from '@tanstack/react-query';
import {
  registerShelter,
  ShelterRegisterPayload,
  ShelterRegisterResponse
} from './sign-up';
import { useAuthContext } from '@/providers/AuthContext';

export default function useShelterRegister() {
  const { setAuthState } = useAuthContext();

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
        } else {
          console.error(response);
        }
      }
    }
  );
}
