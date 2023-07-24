'use client';

import { LoginPayload } from '@/api/shelter/auth/login';
import useShelterLogin from '@/api/shelter/auth/useShelterLogin';
import { Daenggle } from '@/asset/icons';
import Button from '@/components/common/Button/Button';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import TextField from '@/components/common/TextField/TextField';
import { Body3, ButtonText1 } from '@/components/common/Typography';
import useHeader from '@/hooks/useHeader';
import useToast from '@/hooks/useToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loginValidation } from '../utils/shelterValidaion';
import * as styles from './styles.css';
import { useAuthContext } from '@/providers/AuthContext';

export default function ShelterLogin() {
  const methods = useForm<LoginPayload>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(loginValidation)
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = methods;

  const router = useRouter();
  const toastOn = useToast();
  const setHeader = useHeader({ title: '보호소 파트너로 시작하기' });

  const { logout } = useAuthContext();
  useEffect(logout, [logout]);

  const { mutateAsync } = useShelterLogin();

  const handleLogin = useCallback(
    async (data: LoginPayload) => {
      try {
        await mutateAsync(data);
        router.push('/event');
      } catch (e) {
        toastOn('로그인에 실패했습니다.');
        setError(
          'email',
          {
            type: 'focus',
            message: '이메일 주소 또는 비밀번호를 다시 확인해주세요.'
          },
          { shouldFocus: true }
        );
        setError('password', {
          type: 'focus',
          message: '이메일 주소 또는 비밀번호를 다시 확인해주세요.'
        });
      }
    },
    [router, mutateAsync, setError, toastOn]
  );

  return (
    <>
      <div className={styles.logoWrapper}>
        <Daenggle
          style={{
            margin: 'auto',
            display: 'block'
          }}
        />
      </div>

      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(handleLogin)}
        style={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}
      >
        <TextField
          placeholder="이메일을 입력해주세요."
          {...register('email')}
          error={errors.email}
        />
        <TextField
          placeholder="비밀번호를 입력해주세요."
          type="password"
          {...register('password')}
          error={errors.password}
        />
      </FormProvider>

      <Button
        className={styles.buttonWrapper}
        onClick={handleSubmit(handleLogin)}
      >
        로그인
      </Button>

      <div className={styles.findTextWrapper}>
        <ButtonText1
          className={styles.btnTextWrapper}
          color="gray400"
          onClick={() => router.push('/shelter/password')}
        >
          비밀번호 찾기
        </ButtonText1>
      </div>

      <div className={styles.registerTextWrapper}>
        <Body3>아직 dangledangle 회원이 아니신가요?</Body3>
        <ButtonText1
          style={{ cursor: 'pointer' }}
          onClick={() => router.push('/shelter/register')}
        >
          회원가입
        </ButtonText1>
      </div>
    </>
  );
}
