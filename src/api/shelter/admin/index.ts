import api from '@/api/instance';
import { ShelterAdditionalInfo } from './additional-info';

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

export type ShelterInfo = ShelterEssentialInfo & ShelterAdditionalInfo;

export const get = async () => {
  return await api.get('shelter/admin').json<ShelterInfo>();
};
