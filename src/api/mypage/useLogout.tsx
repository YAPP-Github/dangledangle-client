import { useAuthContext } from '@/providers/AuthContext';
import { useMutation } from '@tanstack/react-query';
import useToast from '@/hooks/useToast';
import ky from 'ky';

export default function useLogout() {
  const { logout: clientLogout } = useAuthContext();
  const toastOn = useToast();

  const logoutAPI = async () => {
    const response = await ky
      .get('auth/logout', {
        prefixUrl: process?.env.NEXT_PUBLIC_FRONT_ENDPOINT
      })
      .then(res => res.json<string>());
    return response;
  };

  return useMutation<string, Error>(logoutAPI, {
    onSuccess: response => {
      clientLogout();
      location.href = '/login';
      toastOn('로그아웃이 완료되었습니다.');
    },
    onError: error => {
      console.error('Logout error:', error);
    }
  });
}
