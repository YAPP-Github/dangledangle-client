import api from '@/api/instance';
import { KakaoMapApiResponse } from '@/types';
import { ApiErrorResponse } from '@/types/apiTypes';
import ky from 'ky';

export interface ShelterRegisterPayload {
  email: string;
  password: string;
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

export type ShelterRegisterResponse =
  | {
      shelterId: string;
      shelterUserId: string;
    }
  | ApiErrorResponse;

const config = {
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI}`
  }
};

export const registerShelter = async (data: ShelterRegisterPayload) => {
  const response = await api
    .post(`auth/shelter/register`, {
      json: data
    })
    .then(res => res.json<ShelterRegisterResponse>());

  return response;
};

export const fetchAddress = async (address: string) => {
  const url =
    'https://dapi.kakao.com/v2/local/search/address.json?query=' + address;
  const response = await ky.get(url, config);
  const result = await response.json();
  const mapResult = result as KakaoMapApiResponse;

  return mapResult;
};
