import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload } from './login';
import { ApiErrorResponse } from '@/types/apiTypes';
import { fe } from '@/api/instance';
import { decrypt, encrypt } from '@/utils/passwordCrypto';

export const shelterAuthKey = {
  all: ['shelterAuth'] as const
};

export type ShelterLoginResponse = {
  redirect: string;
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
        queryClient.invalidateQueries(shelterAuthKey.all);
      }
    }
  );
}
