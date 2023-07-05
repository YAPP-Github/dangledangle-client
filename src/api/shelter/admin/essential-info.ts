import api from '@/api/instance';
import { ShelterEssentialInfo } from '@/types/shelter';

export type ShelterEssentialInfoPayload = ShelterEssentialInfo;
export type PutResponse = {
  shelterId: number;
  shelterUserId: number;
};

export const put = async (payload: ShelterEssentialInfoPayload) => {
  return await api
    .put('shelter/admin/essential-info', { json: payload })
    .json<PutResponse>();
};
