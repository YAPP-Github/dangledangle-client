import api from '@/api/instance';
import { ShelterInfo } from '@/types/shelter';

export type ShelterInfoByIdPayload = number;

export type ShelterIdResponse = ShelterInfo & { email: string };

export const post = async (shelterId: ShelterInfoByIdPayload) => {
  return await api
    .post(`shelter/${shelterId}/bookmark`, {
      json: { shelterId }
    })
    .json<ShelterIdResponse>();
};
