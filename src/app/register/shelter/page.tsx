'use client';

import { ShelterRegisterPayload } from '@/api/shelter/auth/sign-up';
import useShelterRegister from '@/api/shelter/auth/useShelterRegister';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import useFunnel, { StepsProps } from '@/hooks/useFunnel';
import useToast from '@/hooks/useToast';
import { removeDash } from '@/utils/formatInputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
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
import { registerValidation } from '@/app/shelter/utils/shelterValidaion';
import useHeader from '@/hooks/useHeader';

export interface OnNextProps {
  onNext: VoidFunction;
  onSubmit: SubmitHandler<SignUpFormValue>;
}

export interface SignUpFormValue extends ShelterRegisterPayload {
  passwordConfirm: string;
}

const Steps: StepsProps<OnNextProps>[] = [
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
  useHeader({ title: '보호소 파트너 계정 가입' });

  const pathname = usePathname();
  const { goToNextStep, currentStepIndex } = useFunnel<OnNextProps>(
    Steps,
    pathname
  );
  const CurrentComponent = Steps[currentStepIndex].component;

  const methods = useForm<SignUpFormValue>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(registerValidation)
  });

  const { mutateAsync } = useShelterRegister();
  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    async (data: SignUpFormValue) => {
      const newData: ShelterRegisterPayload = {
        ...data,
        name: data.name.trim(),
        phoneNumber: removeDash(data.phoneNumber)
      };
      console.log(newData);

      try {
        await mutateAsync(newData);
        goToNextStep();
        toastOn('회원가입에 성공했습니다.');
      } catch (error) {
        toastOn('회원가입에 실패했습니다.');
      }
    },
    [goToNextStep, toastOn, mutateAsync]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <CurrentComponent onNext={goToNextStep} onSubmit={onSubmit} />
    </FormProvider>
  );
}
