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

export const animalsMock: ObservationAnimal[] = [
  {
    id: 0,
    profileImageUrl: '',
    name: '인절미',
    breed: '비글',
    age: 3,
    gender: 'FEMALE',
    specialNote:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  },
  {
    id: 1,
    profileImageUrl: '',
    name: '홍시',
    breed: '비글',
    age: 3,
    gender: 'MALE',
    specialNote:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  }
];
