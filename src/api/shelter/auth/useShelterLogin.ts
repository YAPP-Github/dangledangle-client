import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload, LoginResponse, loginShelter } from './login';
import Cookies from 'js-cookie';

export default function useShelterLogin() {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, LoginPayload>(loginShelter, {
    onSuccess: response => {
      if ('accessToken' in response) {
        Cookies.set('accessToken', response.accessToken);
        Cookies.set('refreshToken', response.refreshToken);
        return queryClient.invalidateQueries(['login']);
      } else {
        console.error(response);
      }
    }
  });
}
