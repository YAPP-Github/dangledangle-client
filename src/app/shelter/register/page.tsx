'use client';

import FormProvider from '@/components/common/FormProvider/FormProvider';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Account from './components/Account';
import Address from './components/Address';
import Description from './components/Description';
import Hp from './components/Hp';
import Name from './components/Name';
import SpecificAddress from './components/SpecificAddress';
import Sure from './components/Sure';

export interface onNextProps {
  onNext: VoidFunction;
}

const Steps = [
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
  const [data, setData] = useState();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const syncPathWithState = () => {
      const pathname = window.location.pathname.slice(-1);
      const stepIndex = Steps.findIndex(
        step => step.path.slice(-1) === pathname
      );
      setCurrentStepIndex(stepIndex >= 0 ? stepIndex : 0);
    };

    window.addEventListener('popstate', syncPathWithState);
    return () => {
      window.removeEventListener('popstate', syncPathWithState);
    };
  }, []);

  const updatePathname = (text: string) => {
    const newUrl = `${window.location.origin}/shelter/register/${text}`;
    window.history.pushState(null, '', newUrl);
  };

  const goToNextStep = () => {
    if (currentStepIndex < Steps.length - 1) {
      const nextStepIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextStepIndex);
      updatePathname(Steps[nextStepIndex].path);
    }
  };

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
