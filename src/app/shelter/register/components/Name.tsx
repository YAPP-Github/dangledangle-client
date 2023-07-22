import Button from '@/components/common/Button/Button';
import EmphasizedTitle, {
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextField from '@/components/common/TextField/TextField';
import useDebounceValidator from '@/hooks/useDebounceValidator';
import useHeader from '@/hooks/useHeader';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { OnNextProps } from '../page';
import * as styles from './../styles.css';

export default function Name({ onNext }: OnNextProps) {
  const {
    register,
    formState: { errors },
    watch,
    setError
  } = useFormContext();
  const nameValue = watch('name');

  const setHeader = useHeader({
    title: '필수정보',
    thisPage: 1,
    entirePage: 4
  });

  const debouncedValidator = useDebounceValidator({
    fieldName: 'name',
    setError: setError,
    message: '이미 등록된 이름입니다. 다시 한번 확인해주세요.'
  });

  useEffect(() => {
    if (nameValue?.length > 0) {
      debouncedValidator(nameValue, 'NAME');
    }
  }, [nameValue, debouncedValidator]);

  return (
    <>
      <div className={styles.titleWrapper} style={{ marginBottom: '126px' }}>
        <EmphasizedTitle>
          <Line>안녕하세요!</Line>
          <Line>보호소 이름을 입력해주세요.</Line>
        </EmphasizedTitle>
      </div>
      <TextField
        maxLength={20}
        helper={'국문/영문/숫자/띄어쓰기 조합 20자 이내 (특수문자 불가)'}
        placeholder="보호소 이름을 입력해주세요."
        {...register('name')}
        onBlur={() => {
          if (nameValue?.length > 0) {
            debouncedValidator(nameValue.trim(), 'NAME');
          }
        }}
        error={errors.name}
      />
      <Button
        disabled={Boolean(errors.name) || !nameValue?.trim()}
        onClick={onNext}
        style={{ marginTop: '40px' }}
      >
        다음
      </Button>
    </>
  );
}
