import api from '@/api/instance';
import { ShelterAdditionalInfo } from '@/types/shelter';

export type ShelterAdditionalInfoPayload = ShelterAdditionalInfo;
export type PutResponse = {
  shelterId: number;
  shelterUserId: number;
};

export const put = async (payload: ShelterAdditionalInfoPayload) => {
  return await api
    .put('shelter/admin/additional-info', { body: JSON.stringify(payload) })
    .json<PutResponse>();
};
