import { ExceptionCode } from '@/constants/exceptionCode';

export interface ApiErrorResponse {
  exceptionCode: ExceptionCode;
  message: string;
  timeStamp: string;
}
