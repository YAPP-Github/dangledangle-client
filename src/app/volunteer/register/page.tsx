'use client';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import useFunnel from '@/hooks/useFunnel';
import { useForm } from 'react-hook-form';
import NickName from './NickName';
import RegisterComplete from './RegisterComplete';
import Button from '@/components/common/Button/Button';
import * as style from './style.css';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';
import { useEffect } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ContactNumber from './ContactNumber';

const pathname = `/volunteer/register`;

const Steps: {
  component: () => JSX.Element;
  path: string;
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
    path: 'step2',
    onClick: async () => {}
  }
];

const validation = Yup.object({
  nickName: Yup.string().max(10).required(),
  nickName2: Yup.string().max(10).required(),
  contactNumber: Yup.string().max(10).required()
});

export default function RegisterPage() {
  const { goToNextStep, currentStepIndex } = useFunnel(Steps, pathname);

  const setHeader = useSetRecoilState(headerState);

  useEffect(() => {
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

    console.log(currentStepIndex);
    console.log('formState', methods.getValues());
    console.log('formState', methods.formState.errors);
  };

  const CurrentComponent = Steps[currentStepIndex].component;

  return (
    <div>
      <section className={style.wrapper}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <CurrentComponent />
        </FormProvider>
      </section>
      <Button
        onClick={handleClick}
        disabled={Boolean(Object.keys(errors).length)}
      >
        다음
      </Button>
    </div>
  );
}
