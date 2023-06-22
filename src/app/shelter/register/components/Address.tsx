import { fetchAddress } from '@/api/shelter/auth/sign-up';
import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { H2 } from '@/components/common/Typography';
import useHeader from '@/hooks/useHeader';
import { KakaoMapApiResponse } from '@/types';
import { handlePostCode } from '@/utils/handlePostCode';
import DaumPostcodeEmbed, { Address } from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';
import { onNextProps } from '../page';

export default function Address({ onNext }: onNextProps) {
  const { setValue } = useFormContext();

  const setHeader = useHeader({
    thisPage: 3,
    entirePage: 4
  });

  const handlePostComplete = async (data: Address) => {
    const [address, fullAddress, zoneCode] = handlePostCode(data);

    setValue('address[address]', fullAddress);
    setValue('address[postalCode]', zoneCode);

    try {
      const result: KakaoMapApiResponse = await fetchAddress(address);
      if (result !== undefined || result !== null) {
        const { x, y } = result.documents[0];
        if (x && y) {
          setValue('address[longitude]', Number(x));
          setValue('address[latitude]', Number(y));
        }
      }
      onNext();
    } catch (error) {
      console.log(error);
    }
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

      <Button disabled={true} onClick={onNext} style={{ marginTop: '40px' }}>
        다음
      </Button>
    </div>
  );
}
