import {
  TOKEN_EXPIRED,
  UNAUTORIZED,
  UNREGISTERED
} from '@/constants/exceptionCode';

export type AuthErrorCodeKeys =
  | typeof UNREGISTERED
  | typeof TOKEN_EXPIRED
  | typeof UNAUTORIZED;

export interface ApiErrorResponse {
  exceptionCode: AuthErrorCodeKeys;
  message: string;
  timeStamp: string;
}
