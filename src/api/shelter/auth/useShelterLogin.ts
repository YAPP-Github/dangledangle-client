import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginPayload } from './login';
import { ApiErrorResponse } from '@/types/apiTypes';
import { fe } from '@/api/instance';

export const shelterAuthKey = {
  all: ['shelterAuth'] as const
};

export type ShelterLoginResponse = {
  redirect: string;
};

const shelterLoginAPI = async (data: LoginPayload) => {
  const response = await fe
    .post(`auth/shelter/login`, {
      json: data
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
