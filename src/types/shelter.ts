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
    parkingEnabled: boolean;
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

export type ShelterHomeTabRenderInfo = {
  title: string;
  PanelComp: () => JSX.Element;
};

export interface ObservationAnimal {
  id: number;
  profileImageUrl: string | null;
  name: string;
  age: string | null;
  gender: AnimalGender | null;
  breed: string | null;
  specialNote: string;
}

export const shelterInfoMock: ShelterInfo = {
  id: 0,
  profileImageUrl: '',
  name: '테스트 보호소',
  phoneNumber: '010-1234-5678',
  description: '테스트 보호소입니다.',
  address: {
    address: '서울특별시 강남구 테헤란로 427',
    addressDetail: '202호',
    postalCode: '12345',
    latitude: 37.123456,
    longitude: 127.123456
  },
  outLinks: [
    {
      outLinkType: 'INSTAGRAM',
      url: 'https://www.instagram.com/yappweb2/'
    }
  ],
  parkingInfo: {
    parkingEnabled: true,
    parkingNotice: '테스트 주차 가능'
  },
  bankAccount: {
    accountNumber: '1234567890',
    bankName: '테스트 은행'
  },
  notice:
    '*입양 상담은 사전 예약제로, 전화 및 카카오톡 채팅으로 예약할 수 있습니다. \n 🐱고양이 입양상담은 평일에만 별도로 운영하므로, 전화로 사전 문의 바랍니다🐈 \n ​*예약이 일찍 마감되는 주말과 공휴일의 경우, 예약 변경 및 취소는 사전 연락 부탁드립니다. 더 많은 입양 상담을 통해, 다양한 아이들에게 입양 기회가 주어지도록 미리 연락주시면 감사드리겠습니다!'
};

export const animalsMock: ObservationAnimal[] = [
  {
    id: 0,
    profileImageUrl: '',
    name: '인절미',
    breed: '비글',
    age: '3살',
    gender: 'FEMALE',
    specialNote:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  },
  {
    id: 1,
    profileImageUrl: '',
    name: '홍시',
    breed: '비글',
    age: '3개월',
    gender: 'MALE',
    specialNote:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  }
];
