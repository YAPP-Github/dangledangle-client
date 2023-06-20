import { AuthErrorCodeKeys } from '@/api/authErrorCode';

export interface ApiErrorResponse {
  code: string;
  message: string;
  timeStamp: string;
}

export interface AuthErrorResponse {
  exceptionCode: string; // 추후 추가되는듯함
  message: string;
  timeStamp: string;
}
