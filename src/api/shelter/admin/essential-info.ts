import api from '@/api/instance';

export type SearchedAddress = {
  address: string;
  postalCode: string;
  latitude: number;
  longitude: number;
};
export type ShelterAddress = SearchedAddress & {
  addressDetail: string;
};
export interface ShelterEssentialInfo {
  name: string;
  phoneNumber: string;
  description: string;
  address: ShelterAddress;
}

export type ShelterEssentialInfoPayload = ShelterEssentialInfo;
export type PutResponse = {
  shelterId: number;
  shelterUserId: number;
};

export const put = async (payload: ShelterEssentialInfoPayload) => {
  return await api
    .put('shelter/admin/essential-info', { body: JSON.stringify(payload) })
    .json<PutResponse>();
};
