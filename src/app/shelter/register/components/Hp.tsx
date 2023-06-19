import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextField from '@/components/common/TextField/TextField';
import { H2 } from '@/components/common/Typography';
import React, { useLayoutEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { onNextProps } from '../page';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';
import TextFieldWithForm from '@/components/common/TextField/TextFieldWithForm';

export default function Hp({ onNext }: onNextProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const setHeader = useSetRecoilState(headerState);
  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      thisPage: 2,
      entirePage: 4
    }));
  }, [setHeader]);

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          marginTop: '40px',
          marginBottom: '160px'
        }}
      >
        <EmphasizedTitle>
          <H2>보호소 연락처를 입력해주세요.</H2>
        </EmphasizedTitle>
      </div>
      <TextFieldWithForm
        name="phoneNumber"
        placeholder="연락처를 입력하세요 (-제외)"
        error={errors['phoneNumber']}
      />
      <Button onClick={onNext} style={{ marginTop: '47px' }}>
        다음
      </Button>
    </div>
  );
}
