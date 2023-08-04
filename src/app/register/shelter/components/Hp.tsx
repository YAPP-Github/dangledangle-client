import Button from '@/components/common/Button/Button';
import EmphasizedTitle, {
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextField from '@/components/common/TextField/TextField';
import useHeader from '@/hooks/useHeader';
import { formatPhone } from '@/utils/formatInputs';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { OnNextProps } from '../page';
import * as styles from './../styles.css';

export default function Hp({ onNext }: OnNextProps) {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();
  const hpValue = watch('phoneNumber');

  useHeader({
    thisPage: 2,
    entirePage: 4
  });

  const handlePhoneNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      event.target.value = formatPhone(value);
    },
    []
  );

  return (
    <>
      <div className={styles.titleWrapper} style={{ marginBottom: '160px' }}>
        <EmphasizedTitle>
          <Line>보호소 연락처를 입력해주세요.</Line>
        </EmphasizedTitle>
      </div>
      <TextField
        {...register('phoneNumber', { onChange: handlePhoneNumberChange })}
        placeholder="연락처를 입력하세요 (-제외)"
        error={errors.phoneNumber}
      />

      <Button
        disabled={Boolean(errors.phoneNumber) || !hpValue?.trim()}
        onClick={onNext}
        style={{ marginTop: '40px' }}
      >
        다음
      </Button>
    </>
  );
}
