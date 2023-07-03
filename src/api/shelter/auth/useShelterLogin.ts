import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload, LoginResponse, loginShelter } from './login';
import Cookies from 'js-cookie';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY
} from '@/constants/cookieKeys';

export const shelterAuthKey = {
  all: ['shelterAuth'] as const
};

export default function useShelterLogin() {
  const queryClient = useQueryClient();
  return useMutation<LoginResponse, Error, LoginPayload>(loginShelter, {
    onSuccess: response => {
      if ('accessToken' in response) {
        Cookies.set(COOKIE_ACCESS_TOKEN_KEY, response.accessToken);
        Cookies.set(COOKIE_REFRESH_TOKEN_KEY, response.refreshToken);
        return queryClient.invalidateQueries(shelterAuthKey.all);
      } else {
        console.error(response);
      }
    }
  });
}
