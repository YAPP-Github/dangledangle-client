'use client';

import FormProvider from '@/components/common/FormProvider/FormProvider';
import useFunnel, { StepsProps } from '@/hooks/useFunnel';
import { SubmitHandler, useForm } from 'react-hook-form';
import Account from './components/Account';
import Address from './components/Address';
import Description from './components/Description';
import Hp from './components/Hp';
import Name from './components/Name';
import SpecificAddress from './components/SpecificAddress';
import Sure from './components/Sure';
import { usePathname, useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';
import { useLayoutEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useShelterRegister from '@/api/shelter/auth/useShelterRegister';
import { signUpPayload } from '@/api/shelter/auth/sign-up';

export interface onNextProps {
  onNext: VoidFunction;
  onSubmit: SubmitHandler<signUpFormValue>;
}

export interface signUpFormValue extends signUpPayload {
  passwordConfirm: string;
}

/**
 * TODO
 * validation 스케마가 임시로 작성되어 수정이 필요합니다.
 * 각 페이지별로 에러에 따른 다음 버튼 disabled 상태 연결이 필요합니다.
 *
 */
const validation = yup.object().shape({
  email: yup
    .string()
    .required('필수항목 입니다.')
    .email('올바른 이메일 형식이 아닙니다.'),
  password: yup
    .string()
    .required()
    .min(8, '비밀번호가 너무 짧습니다. 8~15자로 입력해주세요.')
    .matches(/(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/)
    .max(15, '비밀번호가 너무 짧습니다. 8~15자로 입력해주세요.'),
  passwordConfirm: yup
    .string()
    .optional()
    .oneOf([yup.ref('password'), undefined], '비밀번호가 일치하지 않습니다'),
  name: yup.string().max(20).required(), //// step2
  phoneNumber: yup.string().required(), //// step3
  address: yup.object().shape({
    address: yup.string().required(),
    addressDetail: yup.string().required('필수항목 입니다.'),
    postalCode: yup.string().required(),
    latitude: yup.number().required(),
    longitude: yup.number().required()
  }),
  // [`address[0].addressDetail`]: yup.string().required(), //step5
  description: yup
    .string()
    .required()
    .max(300, '입력 가능 글자수를 초과했어요,') ///step6
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
  const router = useRouter();
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
    resolver: yupResolver(validation)
  });

  const { mutateAsync } = useShelterRegister();
  const {
    handleSubmit,
    formState: { errors }
  } = methods;
  console.log(errors);
  const onSubmit = async (data: signUpFormValue) => {
    // delete data.passwordConfirm;
    console.log(data);

    try {
      await mutateAsync(data);
      //FIXME: 가입완료 페이지로 변경
      router.push('/event');
    } catch (error) {
      //FIXME: 토스트 알림으로 변경
      console.error('회원가입 실패', error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <CurrentComponent onNext={goToNextStep} onSubmit={onSubmit} />
    </FormProvider>
  );
}
