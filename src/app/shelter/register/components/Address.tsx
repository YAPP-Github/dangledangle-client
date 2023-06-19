import React from 'react';
import { onNextProps } from '../page';
import Button from '@/components/common/Button/Button';
import { useFormContext } from 'react-hook-form';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { H2 } from '@/components/common/Typography';
import TextField from '@/components/common/TextField/TextField';

export default function Address({ onNext }: onNextProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  return (
    <div>
      <EmphasizedTitle>
        <H2>보호소 주소를 검색해주세요.</H2>
      </EmphasizedTitle>
      <TextField
        max={10}
        fixedHelper={'국문/영문/숫자/띄어쓰기 조합 20자 이내 (특수문자 불가)'}
        placeholder="보호소 주소을 입력해주세요."
        error={errors['address[0].adress']}
        {...register('address[0].adress')}
      />
      <Button onClick={onNext}>다음</Button>
    </div>
  );
}
