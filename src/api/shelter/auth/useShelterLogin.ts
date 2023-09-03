import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload } from './login';
import { ApiErrorResponse } from '@/types/apiTypes';
import { fe, store } from '@/api/instance';
import { encrypt } from '@/utils/passwordCrypto';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';

export const shelterAuthKey = {
  all: ['shelterAuth'] as const
};

export type ShelterLoginResponse = {
  redirect: string;
  accessToken: string;
};

const shelterLoginAPI = async (data: LoginPayload) => {
  const { email, password } = data;
  const encryptedPassword = encrypt(
    password,
    process.env.NEXT_PUBLIC_ENCRYPT_SECRET!
  );

  const response = await fe
    .post(`auth/shelter/login`, {
      json: {
        email,
        password: encryptedPassword
      }
    })
    .then(res => res.json<ShelterLoginResponse>());

  return response;
};

export default function useShelterLogin() {
  const queryClient = useQueryClient();
  return useMutation<ShelterLoginResponse, ApiErrorResponse, LoginPayload>(
    shelterLoginAPI,
    {
      onSuccess: response => {
        store[COOKIE_ACCESS_TOKEN_KEY] = response.accessToken;
        queryClient.invalidateQueries(shelterAuthKey.all);
      }
    }
  );
}
