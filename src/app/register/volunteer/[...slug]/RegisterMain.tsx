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
  VOLUNTEER_REDIRECT_PATH_LOGIN,
  VOLUNTEER_REDIRECT_PATH_REGISTER,
  RegisterFormValues,
  RegisterPathValues,
  RegisterStepError,
  RegisterSteps,
  STEP_PATH_1,
  STEP_PATH_2,
  STEP_PATH_3
} from './CurrentComponentTypes';
import { ExceptionCode } from '@/constants/exceptionCode';
import { removeDash } from '@/utils/formatInputs';

export default function RegisterMain() {
  useHeader({ title: '기본 정보' });
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
                throw { message: '이미 존재하는 닉네임입니다' };
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
              const phoneNumber = removeDash(
                methods.getValues(FORM_CONTACT_NUMBER)
              );
              const email = Cookies.get(COOKIE_REGISTER_EMAIL_KEY);

              if (!email) {
                return redirect(
                  VOLUNTEER_REDIRECT_PATH_LOGIN,
                  'email 정보가 누락되었습니다. 다시 로그인해주세요.'
                );
              }
              if (!(nickname && phoneNumber)) {
                return redirect(
                  VOLUNTEER_REDIRECT_PATH_REGISTER,
                  '닉네임 또는 연락처 정보가 누락되었습니다. 다시 회원가입을 진행해주세요.'
                );
              }

              const payload: VolunteerRegisterPayload = {
                nickname,
                phoneNumber,
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
      [methods, redirect]
    );

  const { goToNextStep, currentStepIndex } = useFunnel(
    Steps,
    VOLUNTEER_REDIRECT_PATH_REGISTER
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

      // 이메일중복, 닉네임중복의 경우 exception코드 API-001로 전달받음, 이 경우 로그인 페이지로 이동
      if (error?.exceptionCode === ExceptionCode.UNHANDLED_ERROR) {
        return redirect(
          VOLUNTEER_REDIRECT_PATH_LOGIN,
          '회원가입 과정에서 오류가 발생했습니다.'
        );
      }
      if (error)
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
