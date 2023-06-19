'use client';

import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextField from '@/components/common/TextField/TextField';
import { H2 } from '@/components/common/Typography';
import { headerState } from '@/store/header';
import React, { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

const helperMessage = `등록한 파트너 계정의 이메일을 입력해주세요.
비밀번호를 재설정할 수 있는 링크를 보내드립니다.`;

export default function ShelterPassword() {
  const {
    register,
    formState: { errors }
  } = useForm();
  const setHeader = useSetRecoilState(headerState);

  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      title: '비밀번호 찾기'
    }));
  }, [setHeader]);
  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          marginTop: '40px',
          marginBottom: '126px'
        }}
      >
        <EmphasizedTitle>
          <H2>비밀번호를 잊으셨나요?</H2>
          <H2>등록하신 이메일을 입력해주세요</H2>
        </EmphasizedTitle>
      </div>
      <TextField
        maxLength={10}
        helper={helperMessage}
        placeholder="등록하신 이메일을 입력해주세요."
        {...register('email')}
      />
      <Button style={{ marginTop: '47px' }}>비밀번호 재설정 링크 보내기</Button>
    </div>
  );
}
