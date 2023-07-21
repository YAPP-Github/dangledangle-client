import api from '@/api/instance';
import { ShelterInfo } from '@/types/shelter';

export type ShelterInfoByIdPayload = number;

export type ShelterIdResponse = ShelterInfo & { email: string };

export const get = async (shelterId: ShelterInfoByIdPayload) => {
  return await api.get(`shelter/${shelterId}`).json<ShelterIdResponse>();
};
