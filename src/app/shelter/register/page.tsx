'use client';

import FormProvider from '@/components/common/FormProvider/FormProvider';
import useFunnel, { StepsProps } from '@/hooks/useFunnel';
import { useForm } from 'react-hook-form';
import Account from './components/Account';
import Address from './components/Address';
import Description from './components/Description';
import Hp from './components/Hp';
import Name from './components/Name';
import SpecificAddress from './components/SpecificAddress';
import Sure from './components/Sure';
import { usePathname } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';
import { useLayoutEffect } from 'react';

export interface onNextProps {
  onNext: VoidFunction;
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
  }
];

export default function ShelterRegister() {
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

  const methods = useForm();
  const { handleSubmit } = methods;
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <CurrentComponent onNext={goToNextStep} />
    </FormProvider>
  );
}
