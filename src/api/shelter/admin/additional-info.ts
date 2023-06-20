import api from '@/api/instance';
import { OutLinkType } from '@/constants/shelter';

export interface ShelterAdditionalInfo {
  id: number;
  outLinks: [
    {
      outLinkType: OutLinkType;
      url: string;
    }
  ];
  parkingInfo: {
    isParkingEnabled: boolean;
    parkingNotice: string;
  };
  donation: {
    accountNumber: string;
    bankName: string;
  };
  notice: string;
}

export type ShelterAdditionalInfoPayload = Omit<ShelterAdditionalInfo, 'id'>;
export type PutResponse = {
  shelterId: number;
  shelterUserId: number;
};

export const put = async (payload: ShelterAdditionalInfoPayload) => {
  return await api
    .put('/v1/shelter/admin/additional-info', { body: JSON.stringify(payload) })
    .json<PutResponse>();
};
