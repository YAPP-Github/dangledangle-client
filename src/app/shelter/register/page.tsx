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
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
export interface onNextProps {
  onNext: VoidFunction;
}

/**
 * TODO
 * validation 스케마가 임시로 작성되어 수정이 필요합니다.
 * 각 페이지별로 에러에 따른 다음 버튼 disabled 상태 연결이 필요합니다.
 *
 */
const validation = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required(), //// step1
  name: yup.string().max(20).required(), //// step2
  phoneNumber: yup.string().required(), //// step3
  [`address[0].addressDetail`]: yup.string().required(), //step5
  description: yup.string().max(300, '입력 가능 글자수를 초과했어요,') ///step6
});

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

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validation)
  });
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
