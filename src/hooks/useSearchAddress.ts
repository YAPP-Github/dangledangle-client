import { fetchAddress } from '@/api/shelter/auth/sign-up';
import { KakaoMapApiResponse } from '@/types';
import { handlePostCode } from '@/utils/handlePostCode';
import { useState } from 'react';
import { Address } from 'react-daum-postcode';
import { SearchedAddress } from '@/api/shelter/admin/essential-info';

export default function useSearchAddress() {
  const [searchResult, setSearchResult] = useState<SearchedAddress>();

  const onCompleteSearch = async (data: Address) => {
    const [address, fullAddress, zoneCode] = handlePostCode(data);

    try {
      const result: KakaoMapApiResponse = await fetchAddress(address);
      if (result !== undefined || result !== null) {
        const { x, y } = result.documents[0];
        if (x && y) {
          setSearchResult({
            address: fullAddress,
            postalCode: zoneCode,
            longitude: Number(x),
            latitude: Number(y)
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { searchResult, onCompleteSearch };
}
