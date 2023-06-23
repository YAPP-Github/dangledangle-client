import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextFieldWithForm from '@/components/common/TextField/TextFieldWithForm';
import { H2 } from '@/components/common/Typography';
import useHeader from '@/hooks/useHeader';
import { useFormContext } from 'react-hook-form';
import { onNextProps } from '../page';
import * as styles from './../styles.css';

export default function Hp({ onNext }: onNextProps) {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext();
  const hpValue = watch('phoneNumber');

  const setHeader = useHeader({
    thisPage: 2,
    entirePage: 4
  });

  return (
    <>
      <div className={styles.titleWrapper} style={{ marginBottom: '160px' }}>
        <EmphasizedTitle>
          <H2>보호소 연락처를 입력해주세요.</H2>
        </EmphasizedTitle>
      </div>
      <TextFieldWithForm
        {...register('phoneNumber')}
        placeholder="연락처를 입력하세요 (-제외)"
        error={errors.phoneNumber}
      />

      <Button
        disabled={!!errors.phoneNumber || !hpValue?.trim()}
        onClick={onNext}
        style={{ marginTop: '40px' }}
      >
        다음
      </Button>
    </>
  );
}
