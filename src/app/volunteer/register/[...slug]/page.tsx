'use client';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import useFunnel from '@/hooks/useFunnel';
import { useForm } from 'react-hook-form';
import NickName from './NickName';
import Button from '@/components/common/Button/Button';
import * as style from './style.css';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ContactNumber from './ContactNumber';
import RegisterComplete from './RegisterComplete';
import { NextPage } from 'next';

const pathname = `/volunteer/register`;

type VolunteerRegisterFormValues = {
  nickName: string;
  contactNumber: string;
  complete: string;
};

const validation: Yup.ObjectSchema<Partial<VolunteerRegisterFormValues>> =
  Yup.object().shape({
    nickName: Yup.string()
      .max(10)
      .required()
      .test(
        'no-emoji',
        '이모티콘은 사용할 수 없습니다',
        (value = '') =>
          !/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu.test(value)
      ),
    contactNumber: Yup.string()
      .required()
      .matches(
        /^(01[0-9]{1}|(02|0[3-9]{2}))[0-9]{3,4}[0-9]{4}$/,
        '전화번호 형식이 아닙니다'
      ),
    complete: Yup.string()
  });

const Steps: {
  component: () => JSX.Element;
  path: keyof VolunteerRegisterFormValues;
  onClick: (() => void) | null;
}[] = [
  {
    component: NickName,
    path: 'nickName',
    onClick: null
  },
  {
    component: ContactNumber,
    path: 'contactNumber',
    onClick: async () => {}
  },
  {
    component: RegisterComplete,
    path: 'complete',
    onClick: async () => {}
  }
];

export default function RegisterPage({ params }: { params: { slug: string } }) {
  const { goToNextStep, currentStepIndex } = useFunnel(Steps, pathname);

  const setHeader = useSetRecoilState(headerState);

  useEffect(() => {
    if (params) window.history.replaceState(null, '', `${pathname}/nickName`);
    setHeader({ title: '기본 설정', thisPage: null, entirePage: null });
  });

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validation)
  });

  const {
    handleSubmit,
    formState: { errors }
  } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const handleClick = () => {
    methods.control._updateValid();
    const stepOnclickFunction = Steps[currentStepIndex].onClick;

    if (stepOnclickFunction) {
      stepOnclickFunction();
    }

    goToNextStep();
  };

  const CurrentComponent = Steps[currentStepIndex].component;
  const currentError = errors[Steps[currentStepIndex].path];

  return (
    <div>
      <section className={style.wrapper}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CurrentComponent />
        </FormProvider>
      </section>
      <Button onClick={handleClick} disabled={Boolean(currentError)}>
        다음
      </Button>
    </div>
  );
}
