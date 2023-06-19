import { AuthErrorCodeKeys } from '@/api/authErrorCode';

export interface ApiErrorResponse {
  code: string;
  message: string;
  timeStamp: string;
}

export interface AuthErrorResponse {
  exceptionCode: AuthErrorCodeKeys;
  message: string;
  timeStamp: string;
}
