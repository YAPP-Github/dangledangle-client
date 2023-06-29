import { OutLinkType } from '@/constants/shelter';
import { AnimalGender } from '@/constants/animal';

export type OutLink = {
  outLinkType: OutLinkType;
  url: string;
};

export type SearchedAddress = {
  address: string;
  postalCode: string;
  latitude: number;
  longitude: number;
};

export type ShelterAddress = SearchedAddress & {
  addressDetail: string;
};

export interface ShelterAdditionalInfo {
  outLinks: OutLink[];
  parkingInfo: {
    isParkingEnabled: boolean;
    parkingNotice: string;
  } | null;
  bankAccount: {
    accountNumber: string;
    bankName: string;
  } | null;
  notice: string | null;
}

export interface ShelterEssentialInfo {
  name: string;
  phoneNumber: string;
  description: string;
  address: ShelterAddress;
}

export type ShelterInfo = ShelterEssentialInfo &
  ShelterAdditionalInfo & {
    id: number;
    profileImageUrl: string;
  };

export interface ObservationAnimal {
  id: number;
  profileImageUrl: string;
  name: string;
  age: number;
  gender: AnimalGender;
  breed: string;
  specialNote: string;
}
