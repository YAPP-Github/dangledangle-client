import { useMutation } from '@tanstack/react-query';
import { LoginPayload, LoginResponse, loginShelter } from './login';
import Cookies from 'js-cookie';

export default function useShelterLogin() {
  const loginMutation = useMutation<LoginResponse, Error, LoginPayload>(
    loginShelter,
    {
      onSuccess: response => {
        if ('accessToken' in response) {
          Cookies.set('accessToken', response.accessToken);
          Cookies.set('refreshToken', response.refreshToken);
        } else {
          console.error('에러 발생 :', response);
        }
      }
    }
  );
  return loginMutation;
}
