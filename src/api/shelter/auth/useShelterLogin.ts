import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload, LoginResponse, loginShelter } from './login';
import Cookies from 'js-cookie';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY
} from '@/api/cookieKeys';

export default function useShelterLogin() {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, LoginPayload>(loginShelter, {
    onSuccess: response => {
      if ('accessToken' in response) {
        Cookies.set(COOKIE_ACCESS_TOKEN_KEY, response.accessToken);
        Cookies.set(COOKIE_REFRESH_TOKEN_KEY, response.refreshToken);
        return queryClient.invalidateQueries(['login']);
      } else {
        console.error(response);
      }
    }
  });
}
