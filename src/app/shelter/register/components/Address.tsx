import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { H2 } from '@/components/common/Typography';
import { headerState } from '@/store/header';
import { KakaoMapApiResponse } from '@/types';
import ky from 'ky';
import { useLayoutEffect } from 'react';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { onNextProps } from '../page';
import { handlePostCode } from '@/utils/handlePostCode';

const config = {
  headers: {
    Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI}`
  }
};

export default function Address({ onNext }: onNextProps) {
  const { setValue } = useFormContext();

  const setHeader = useSetRecoilState(headerState);
  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      thisPage: 3,
      entirePage: 4
    }));
  }, [setHeader]);

  const handlePostComplete = (data: Address) => {
    const [address, fullAddress, zoneCode] = handlePostCode(data);

    setValue('address[address]', fullAddress);
    setValue('address[postalCode]', zoneCode);

    const url =
      'https://dapi.kakao.com/v2/local/search/address.json?query=' + address;

    ky.get(url, config)
      .then(res => res.json())
      .then(result => {
        const mapResult = result as KakaoMapApiResponse;
        if (mapResult !== undefined || mapResult !== null) {
          const { x, y } = mapResult.documents[0];
          if (x && y) {
            setValue('address[longitude]', Number(x));
            setValue('address[latitude]', Number(y));
          }
        }
      })
      .then(onNext);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          marginTop: '40px',
          marginBottom: '115px'
        }}
      >
        <EmphasizedTitle>
          <H2>보호소 주소를 검색해주세요.</H2>
        </EmphasizedTitle>
      </div>

      <div style={{ height: '390px', overflowY: 'hidden' }}>
        <DaumPostcodeEmbed
          onComplete={handlePostComplete}
          useBannerLink={false}
        />
      </div>

      <Button disabled={true} onClick={onNext} style={{ marginTop: '47px' }}>
        다음
      </Button>
    </div>
  );
}
