import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload } from './login';
import ky from 'ky';
import { ApiErrorResponse } from '@/types/apiTypes';

export const shelterAuthKey = {
  all: ['shelterAuth'] as const
};

export type ShelterLoginResponse = {
  redirect: string;
};

const shelterLoginAPI = async (data: LoginPayload) => {
  const response = await ky
    .post(`auth/shelter/login`, {
      json: data,
      prefixUrl: process.env.NEXT_PUBLIC_FRONT_ENDPOINT
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
