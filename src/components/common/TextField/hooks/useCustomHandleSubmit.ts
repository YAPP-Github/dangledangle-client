import { isEmptyObject } from '@/utils/isEmptyObject';
import { useCallback } from 'react';
import {
  FieldValue,
  UseFormHandleSubmit,
  UseFormReturn
} from 'react-hook-form';

export default function useCustomHAndleSubmit(useFormReturn: UseFormReturn) {
  const handleSubmit: HandleSubmitType = useCallback(
    (onValid, onInvalid) => async e => {
      if (e) {
        e.preventDefault && e.preventDefault();
        e.persist && e.persist();
      }
      const originHandleSubmit = useFormReturn.handleSubmit;
      const control = useFormReturn.control;
      const _formState = control._formState;

      // useForm의 validation 진행
      control._updateValid(true);

      // TextField가 이전에 에러 설정해둔 경우 false로 작동
      if (isEmptyObject(_formState.errors)) {
        return await originHandleSubmit(onValid, onInvalid)(e);
      } else {
        if (onInvalid) {
          await onInvalid({ ..._formState.errors }, e);
        }
      }
    },
    [useFormReturn]
  );

  return handleSubmit;
}
type HandleSubmitType = UseFormHandleSubmit<FieldValue<any>>;
