'use client';

import { signUpPayload } from '@/api/shelter/auth/sign-up';
import useShelterRegister from '@/api/shelter/auth/useShelterRegister';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import useFunnel, { StepsProps } from '@/hooks/useFunnel';
import useToast from '@/hooks/useToast';
import { headerState } from '@/store/header';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { registerValidation } from '../utils/shelterValidaion';
import Account from './components/Account';
import Additional from './components/Additional';
import Address from './components/Address';
import Description from './components/Description';
import Hp from './components/Hp';
import Name from './components/Name';
import RegisterComplete from './components/RegisterComplete';
import RequireComplete from './components/RequireComplete';
import SpecificAddress from './components/SpecificAddress';
import Sure from './components/Sure';

export interface onNextProps {
  onNext: VoidFunction;
  onSubmit: SubmitHandler<signUpFormValue>;
}

export interface signUpFormValue extends signUpPayload {
  passwordConfirm: string;
}

const Steps: StepsProps<onNextProps>[] = [
  {
    component: Sure,
    path: 'step0'
  },
  {
    component: Account,
    path: 'step1'
  },
  {
    component: Name,
    path: 'step2'
  },
  {
    component: Hp,
    path: 'step3'
  },
  {
    component: Address,
    path: 'step4'
  },
  {
    component: SpecificAddress,
    path: 'step5'
  },
  {
    component: Description,
    path: 'step6'
  },
  {
    component: RequireComplete,
    path: 'step7'
  },
  {
    component: Additional,
    path: 'step8'
  },
  {
    component: RegisterComplete,
    path: 'step9'
  }
];

export default function ShelterRegister() {
  const toastOn = useToast();
  const setHeader = useSetRecoilState(headerState);

  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      title: '보호소 파트너 계정 가입'
    }));
  }, [setHeader]);

  const pathname = usePathname();
  const { goToNextStep, currentStepIndex } = useFunnel<onNextProps>(
    Steps,
    pathname
  );
  const CurrentComponent = Steps[currentStepIndex].component;

  const methods = useForm<signUpFormValue>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(registerValidation)
  });

  const { mutateAsync } = useShelterRegister();
  const { handleSubmit } = methods;

  const onSubmit = async (data: signUpFormValue) => {
    console.log(data);

    try {
      await mutateAsync(data);
      goToNextStep();
    } catch (error) {
      toastOn('회원가입에 실패했습니다.');
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <CurrentComponent onNext={goToNextStep} onSubmit={onSubmit} />
    </FormProvider>
  );
}
