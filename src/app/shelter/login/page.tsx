'use client';

import { Daenggle } from '@/asset/icons';
import Button from '@/components/common/Button/Button';
import TextField from '@/components/common/TextField/TextField';
import { Body3, ButtonText1 } from '@/components/common/Typography';
import { headerState } from '@/store/header';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

export default function ShelterLogin() {
  const { register } = useForm();
  const router = useRouter();
  const setHeader = useSetRecoilState(headerState);

  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      title: '보호소 파트너로 시작하기'
    }));
  }, [setHeader]);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ margin: '80px auto' }}>
        <Daenggle
          style={{
            margin: 'auto',
            display: 'block'
          }}
        />
      </div>
      <TextField
        label="이메일"
        placeholder="이메일을 입력해주세요."
        {...register('email')}
      />
      <TextField
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        type="password"
        {...register('password')}
      />
      <Button style={{ marginTop: '47px' }}>로그인</Button>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonText1
          onClick={() => router.push('/shelter/password')}
          color="gray400"
          style={{
            margin: '16px 0 0 auto',
            cursor: 'pointer'
          }}
        >
          비밀번호 찾기
        </ButtonText1>
      </div>
      <div
        style={{
          display: 'flex',
          columnGap: '10px',
          justifyContent: 'center',
          marginTop: '34px'
        }}
      >
        <Body3>아직 daenggle 회원이 아니신가요?</Body3>
        <ButtonText1
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/shelter/register')}
        >
          회원가입
        </ButtonText1>
      </div>
    </div>
  );
}
