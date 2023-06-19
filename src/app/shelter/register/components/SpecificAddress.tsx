import React from 'react';
import { onNextProps } from '../page';
import Button from '@/components/common/Button/Button';
import { useFormContext } from 'react-hook-form';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { H2 } from '@/components/common/Typography';
import TextField from '@/components/common/TextField/TextField';

export default function SpecificAddress({ onNext }: onNextProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  return (
    <div>
      <EmphasizedTitle>
        <H2>상세 주소를 입력해주세요.</H2>
      </EmphasizedTitle>
      <TextField
        maxLength={10}
        placeholder="상세 주소를 입력하세요"
        error={errors['address[0].addressDetail']}
        {...register('address[0].addressDetail')}
      />
      <Button onClick={onNext}>다음</Button>
    </div>
  );
}
