'use client';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import useFunnel from '@/hooks/useFunnel';
import { useForm } from 'react-hook-form';
import NickName from './NickName';
import Button from '@/components/common/Button/Button';
import * as style from './style.css';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';
import { useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import ContactNumber from './ContactNumber';
import { validation } from './validationSchema';
import RegisterComplete from '@/components/volunteer/RegisterComplete/RegisterComplete';
import { checkNickname } from '@/api/auth/volunteer/nickname';
import {
  VolunteerRegisterPayload,
  volunteerRegister
} from '@/api/auth/volunteer/register';
import { COOKIE_REGISTER_EMAIL_KEY } from '@/api/cookieKeys';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

export type RegisterFormValues = {
  nickname: string;
  contactNumber: string;
  complete: string;
};
type RegisterSteps<T> = {
  component: () => JSX.Element;
  path: keyof T;
  asyncCheck: Function;
};

export default function RegisterMain() {
  const Steps: RegisterSteps<RegisterFormValues>[] = useMemo(
    () => [
      {
        component: NickName,
        path: 'nickname',
        asyncCheck: async () => {
          const query = getValues('nickname');
          const { isExist } = await checkNickname(query || '');
          if (isExist === true) throw new Error('이미 존재하는 닉네임입니다.');
        }
      },
      {
        component: ContactNumber,
        path: 'contactNumber',
        asyncCheck: async () => {
          const nickname = getValues('nickname');
          const phone = getValues('contactNumber');
          const email = Cookies.get(COOKIE_REGISTER_EMAIL_KEY);

          if (!email) return redirect('/volunteer/login');
          if (!(nickname && phone)) return redirect('/volunteer/register');

          const payload: VolunteerRegisterPayload = {
            nickname,
            phone,
            email
          };
          return await volunteerRegister(payload);
        }
      },
      {
        component: RegisterComplete,
        path: 'complete',
        asyncCheck: () => {} // RegisterComplete는 별개의 페이지
      }
    ],
    []
  );

  const setHeader = useSetRecoilState(headerState);
  const { goToNextStep, currentStepIndex } = useFunnel(
    Steps,
    '/volunteer/register'
  );

  useEffect(() => {
    setHeader({ title: '기본 설정', thisPage: null, entirePage: null });
  });

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validation)
  });

  const {
    control,
    getValues,
    setError,
    formState: { errors }
  } = methods;

  /**
   * /volunteer/register 페이지에서 "다음" 버튼을 눌렀을 때 실행되는 함수
   *
   */
  const handleClick = async () => {
    control._updateValid();
    const stepOnclickFunction = Steps[currentStepIndex].asyncCheck;

    try {
      await stepOnclickFunction();
      return goToNextStep();
    } catch (e) {
      const error = e as Error;
      setError(
        Steps[currentStepIndex].path,
        { type: 'focus', message: error.message },
        { shouldFocus: true }
      );
    }
  };

  const CurrentComponent = Steps[currentStepIndex].component;
  const currentError = errors[Steps[currentStepIndex].path];

  return (
    <div>
      <section className={style.wrapper}>
        <FormProvider methods={methods}>
          <CurrentComponent />
        </FormProvider>
      </section>
      {currentStepIndex !== Steps.length - 1 && (
        <Button onClick={handleClick} disabled={Boolean(currentError)}>
          다음
        </Button>
      )}
    </div>
  );
}
