import api from '@/api/instance';
import { OutLinkType } from '@/constants/shelter';

export type OutLink = {
  outLinkType: OutLinkType;
  url: string;
};
export interface ShelterAdditionalInfo {
  outLinks: OutLink[];
  parkingInfo: {
    isParkingEnabled: boolean;
    parkingNotice: string;
  } | null;
  donation: {
    accountNumber: string;
    bankName: string;
  } | null;
  notice: string | null;
}

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
