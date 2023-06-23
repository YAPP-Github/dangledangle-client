import api from '@/api/instance';
import { KakaoMapApiResponse } from '@/types';
import { ApiErrorResponse } from '@/types/apiTypes';
import ky from 'ky';

export interface signUpPayload {
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

export type signUpResponse =
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

export const registerShelter = async (data: signUpPayload) => {
  const response = await api
    .post(`auth/shelter/sign-up`, {
      json: data
    })
    .then(res => res.json<signUpResponse>());

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
