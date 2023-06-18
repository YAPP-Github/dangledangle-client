import React from 'react';
import { onNextProps } from '../page';
import Button from '@/components/common/Button/Button';
import { useFormContext } from 'react-hook-form';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { H2 } from '@/components/common/Typography';
import TextField from '@/components/common/TextField/TextField';

export default function SpecificAddress({ onNext }: onNextProps) {
  const { register } = useFormContext();
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
        placeholder="보호소 주소을 입력해주세요."
        {...register('address[0].addressDetail')}
      />
      <TextField
        placeholder="상세주소를 입력하세요."
        {...register('address[0].addressDetail')}
      />
      <Button onClick={onNext} style={{ marginTop: '47px' }}>
        다음
      </Button>
    </div>
  );
}
