import { KakaoMapComponentApiRes } from '@/types';
import ky from 'ky';

const config = {
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI}`
  }
};

export const fetchDistrictOfficeAddress = async (
  longitude: number,
  latitude: number
) => {
  const url = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
  const response = await ky.get(url, config);
  const result = await response.json();
  const mapResult = result as KakaoMapComponentApiRes;

  return mapResult;
};

export const fetchAccurateAddress = async (query: string) => {
  const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
    query
  )}`;
  const response = await ky.get(url, config);
  const result = await response.json();
  const mapResult = result as KakaoMapComponentApiRes;

  return mapResult;
};
