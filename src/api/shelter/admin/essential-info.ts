import api from '@/api/instance';

export interface ShelterEssentialInfo {
  name: string;
  phoneNumber: string;
  description: string;
  address: {
    address: string;
    addressDetail: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };
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
