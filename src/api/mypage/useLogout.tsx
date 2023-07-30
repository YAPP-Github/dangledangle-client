import { initialAuthState, useAuthContext } from '@/providers/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { logout } from './mypage';
import Cookies from 'js-cookie';
import {
  COOKIE_ACCESS_TOKEN_KEY,
  COOKIE_REFRESH_TOKEN_KEY
} from '@/constants/cookieKeys';
import { useRouter } from 'next/navigation';

export default function useLogout() {
  const { setAuthState } = useAuthContext();
  const router = useRouter();

  return useMutation<string, Error>(logout, {
    onSuccess: response => {
      if (Cookies.get(COOKIE_ACCESS_TOKEN_KEY)) {
        setAuthState(initialAuthState); // AuthContext info delete
        // client cookies delete
        Cookies.remove(COOKIE_ACCESS_TOKEN_KEY);
        Cookies.remove(COOKIE_REFRESH_TOKEN_KEY);
        router.push('/login');
      } else {
        console.error(response);
      }
    },
    onError: error => {
      console.error('Logout error:', error);
    }
  });
}
