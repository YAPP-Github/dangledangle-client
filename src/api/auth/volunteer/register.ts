import api from '@/api/instance';
import { ApiErrorResponse } from '@/types/apiTypes';

export interface VolunteerRegisterPayload {
  nickname: string;
  email: string;
  phone: string;
}

export type RegisterResponse =
  | {
      userId: number;
    }
  | ApiErrorResponse;

export const volunteerRegister = async (payload: VolunteerRegisterPayload) => {
  const response = await api
    .post(`auth/volunteer/register`, {
      json: payload
    })
    .then(res => res.json<RegisterResponse>());
  return response;
};
