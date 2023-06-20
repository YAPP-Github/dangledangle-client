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
import {
  VolunteerRegisterPayload,
  postVolunteerRegister
} from '@/api/auth/register';
import { fetchCheckNickname } from '@/api/user/nickname';
import { validation } from './validationSchema';
import RegisterComplete from '@/components/volunteer/RegisterComplete/RegisterComplete';

export type RegisterFormValues = {
  nickName: string;
  contactNumber: string;
  complete: string;
};
type RegisterSteps<T> = {
  component: () => JSX.Element;
  path: keyof T;
  asyncCheck: Function;
};

export default function RegisterPage({ params }: { params: { slug: string } }) {
  const Steps: RegisterSteps<RegisterFormValues>[] = useMemo(
    () => [
      {
        component: NickName,
        path: 'nickName',
        asyncCheck: async () => {
          const query = getValues('nickName');
          const check = await fetchCheckNickname(query || '');
          if (check === true) throw new Error('이미 존재하는 닉네임입니다.');
        }
      },
      {
        component: ContactNumber,
        path: 'contactNumber',
        asyncCheck: async () => {
          const payload: VolunteerRegisterPayload = {
            nickname: getValues('nickName') || '',
            phone: getValues('contactNumber') || '',
            email: 'sangjun@naver.com' as string // 이메일을 알수가엇ㅂ어..
          };
          return await postVolunteerRegister(payload);
        }
      },
      {
        component: RegisterComplete,
        path: 'complete',
        asyncCheck: async () => {}
      }
    ],
    []
  );

  const pathname = `/volunteer/register`;
  const setHeader = useSetRecoilState(headerState);
  const { goToNextStep, currentStepIndex } = useFunnel(Steps, pathname);

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

  const handleClick = async () => {
    control._updateValid();
    const stepOnclickFunction = Steps[currentStepIndex].asyncCheck;

    try {
      // await stepOnclickFunction();
      return goToNextStep();
    } catch (e) {
      const error = e as Error;
      console.log(e);
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
