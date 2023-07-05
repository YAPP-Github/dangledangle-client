import { ApiErrorResponse } from '@/types/apiTypes';

export const STEP_PATH_1 = 'nickname';
export const STEP_PATH_2 = 'contactNumber';
export const STEP_PATH_3 = 'complete';

export const FORM_NICKNAME = 'nickname';
export const FORM_CONTACT_NUMBER = 'contactNumber';

export const VOLUNTEER_REDIRECT_PATH_LOGIN = '/volunteer/login';
export const VOLUNTEER_REDIRECT_PATH_REGISTER = '/volunteer/register';

export type RegisterFormValues =
  | typeof FORM_NICKNAME
  | typeof FORM_CONTACT_NUMBER;

export type RegisterPathValues =
  | typeof STEP_PATH_1
  | typeof STEP_PATH_2
  | typeof STEP_PATH_3;

export interface CurrentComponentProps {
  formName: RegisterPathValues | null;
}

export type RegisterSteps<FormPathsTypes, FormNamesTypes> = {
  component: ({ formName }: CurrentComponentProps) => JSX.Element;
  path: FormPathsTypes;
  formName?: FormNamesTypes;
  asyncCheck?: Function;
};

export type RegisterStepError = {
  error: ApiErrorResponse;
  formName: RegisterFormValues;
};
