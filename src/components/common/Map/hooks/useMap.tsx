import { useCallback, useEffect, useState } from 'react';
import { fetchAccurateAddress, fetchDistrictOfficeAddress } from '../utils/api';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function useMap(longitude: number, latitude: number) {
  const [districtName, setDistrictName] = useState('');

  // 가장 가까운 구청의 주소를 반환하는 함수
  const getDistrictOfficeAddress = useCallback(
    async (longitude: number, latitude: number) => {
      const result = await fetchDistrictOfficeAddress(longitude, latitude);

      const { region_1depth_name, region_2depth_name, region_3depth_name } =
        result.documents[0];

      // ##구 찾아서 ##구청 문자열을 return || ##구 없으면 ##시 찾아서 ##시청 문자열을 return
      const regions = [
        region_1depth_name,
        region_2depth_name,
        region_3depth_name
      ];

      let districtOrCity = regions.find(name => name?.slice(-1) === '구');

      if (!districtOrCity) {
        districtOrCity = regions.find(name => name?.slice(-1) === '시');
      }

      return districtOrCity
        ? `${region_1depth_name} ${districtOrCity}청`
        : null;
    },
    []
  );

  // 구청 정확한 주소를 반환하는 함수
  const getAccurateAddress = useCallback(
    async (
      query: string
    ): Promise<{ x: string; y: string; place_name: string } | null> => {
      try {
        const result = await fetchAccurateAddress(query);

        if (result && result.documents && result.documents.length > 0) {
          const { x, y, place_name } = result.documents[0];
          setDistrictName(place_name);

          return { x, y, place_name };
        } else {
          return null;
        }
      } catch (error) {
        throw new Error('Accurate Address를 찾지 못했습니다.');
      }
    },
    []
  );

  const onLoadKakaoMap = useCallback(async () => {
    window.kakao.maps.load(async () => {
      // 가장 가까운 ##구청, 혹은 ##시청 문자열을 return 합니다.
      const districtOffice = await getDistrictOfficeAddress(
        longitude,
        latitude
      );

      // 해당 구청 주소의 위도, 경도를 불러옵니다.
      const AccurateDistrictAddress = await getAccurateAddress(districtOffice!);

      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(
          AccurateDistrictAddress?.y || latitude,
          AccurateDistrictAddress?.x || longitude
        )
      };

      // 지도를 생성합니다.
      const map = new window.kakao.maps.Map(container, options);

      // 마커를 생성합니다.
      const markerPosition = new window.kakao.maps.LatLng(
        AccurateDistrictAddress?.y || latitude,
        AccurateDistrictAddress?.x || longitude
      );

      const marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);
    });
  }, [getAccurateAddress, getDistrictOfficeAddress, latitude, longitude]);

  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API}&autoload=false`;

    document.head.appendChild(mapScript);

    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [latitude, longitude, onLoadKakaoMap]);

  return { districtName };
}
