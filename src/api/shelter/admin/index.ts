import api from '@/api/instance';
import { ShelterAdditionalInfo } from './additional-info';
import { ShelterEssentialInfo } from './essential-info';

export type ShelterInfo = ShelterEssentialInfo &
  ShelterAdditionalInfo & {
    profileImageUrl: string;
  };

export const get = async () => {
  return await api.get('shelter/admin').json<ShelterInfo>();
};
