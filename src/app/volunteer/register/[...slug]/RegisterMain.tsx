'use client';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import useFunnel from '@/hooks/useFunnel';
import { useForm } from 'react-hook-form';
import NickName from './NickName';
import Button from '@/components/common/Button/Button';
import * as style from './style.css';
import { useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import ContactNumber from './ContactNumber';
import { validation } from './validationSchema';
import RegisterComplete from '@/components/volunteer/RegisterComplete/RegisterComplete';
import { checkNicknameExist } from '@/api/auth/volunteer/exist';
import {
  VolunteerRegisterPayload,
  volunteerRegister
} from '@/api/auth/volunteer/register';
import Cookies from 'js-cookie';
import useHeader from '@/hooks/useHeader';
import { COOKIE_REGISTER_EMAIL_KEY } from '@/constants/cookieKeys';
import useRedirectAtCatchBlock from '@/hooks/useRedirectAtCatchBlock';
import {
  FORM_CONTACT_NUMBER,
  FORM_NICKNAME,
  REDIRECT_PATH_LOGIN,
  REDIRECT_PATH_REGISTER,
  RegisterFormValues,
  RegisterPathValues,
  RegisterStepError,
  RegisterSteps,
  STEP_PATH_1,
  STEP_PATH_2,
  STEP_PATH_3
} from './CurrentComponentTypes';

export default function RegisterMain() {
  const setHeader = useHeader({ title: '기본 정보' });
  const redirect = useRedirectAtCatchBlock();

  const methods = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validation)
  });

  const Steps: RegisterSteps<RegisterPathValues, RegisterFormValues>[] =
    useMemo(
      () => [
        {
          component: NickName,
          path: STEP_PATH_1,
          formName: FORM_NICKNAME,
          asyncCheck: async () => {
            try {
              const query = methods.getValues(FORM_NICKNAME);
              const { isExist } = await checkNicknameExist(query || '');
              if (isExist === true)
                throw new Error('이미 존재하는 닉네임입니다.');
            } catch (e) {
              throw { error: e, formName: FORM_NICKNAME } as RegisterStepError; // formName 추가해서 throw
            }
          }
        },
        {
          component: ContactNumber,
          path: STEP_PATH_2,
          formName: FORM_CONTACT_NUMBER,
          asyncCheck: async () => {
            try {
              const nickname = methods.getValues(FORM_NICKNAME);
              const phone = methods.getValues(FORM_CONTACT_NUMBER);
              const email = Cookies.get(COOKIE_REGISTER_EMAIL_KEY);

              if (!email) {
                return redirect(REDIRECT_PATH_LOGIN);
              }
              if (!(nickname && phone)) {
                return redirect(REDIRECT_PATH_REGISTER);
              }

              const payload: VolunteerRegisterPayload = {
                nickname,
                phone,
                email
              };
              return await volunteerRegister(payload);
            } catch (e) {
              throw {
                error: e,
                formName: FORM_CONTACT_NUMBER
              } as RegisterStepError; // formName 추가해서 throw
            }
          }
        },
        {
          component: RegisterComplete,
          path: STEP_PATH_3
        }
      ],
      []
    );

  const { goToNextStep, currentStepIndex } = useFunnel(
    Steps,
    REDIRECT_PATH_REGISTER
  );

  /**
   * /volunteer/register 페이지에서 "다음" 버튼을 눌렀을 때 실행되는 함수
   */
  const handleClick = async () => {
    methods.trigger();
    const stepOnclickFunction =
      Steps[currentStepIndex].asyncCheck || (() => {});
    try {
      await stepOnclickFunction();
      return goToNextStep();
    } catch (e) {
      const { error, formName } = e as RegisterStepError;

      methods.setError(
        formName,
        { type: 'focus', message: error.message },
        { shouldFocus: true }
      );
    }
  };

  const CurrentComponent = Steps[currentStepIndex].component;
  const currentFormName = Steps[currentStepIndex].formName || null;
  const currentError = currentFormName
    ? methods.formState.errors[currentFormName]
    : false;

  return (
    <div>
      <section className={style.wrapper}>
        <FormProvider methods={methods}>
          <CurrentComponent formName={currentFormName} />
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
