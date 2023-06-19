import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextField from '@/components/common/TextField/TextField';
import { H2 } from '@/components/common/Typography';
import { useFormContext } from 'react-hook-form';
import { onNextProps } from '../page';

export default function SpecificAddress({ onNext }: onNextProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          marginTop: '40px',
          marginBottom: '109px'
        }}
      >
        <EmphasizedTitle>
          <H2>상세 주소를 입력해주세요.</H2>
        </EmphasizedTitle>
      </div>

      <TextField
        placeholder="우편번호를 입력해주세요."
        {...register('address[postalCode]')}
      />
      <TextField
        placeholder="보호소 주소을 입력해주세요."
        {...register('address[address]')}
      />
      <TextField
        maxLength={10}
        placeholder="상세 주소를 입력하세요"
        // error={errors.address?.addressDetail}
        {...register('address[addressDetail]')}
      />

      {/* longitude x축 경도 latitude y축 위도 */}
      <input style={{ display: 'none' }} {...register('address[longitude]')} />
      <input style={{ display: 'none' }} {...register('address[latitude]')} />

      <Button onClick={onNext} style={{ marginTop: '47px' }}>
        다음
      </Button>
    </div>
  );
}
