import { useCallback } from 'react';
import {
  FieldValue,
  UseFormHandleSubmit,
  UseFormReturn
} from 'react-hook-form';
import { isEmptyObject } from '@/utils/isEmptyObject';

export default function useTextFieldFormAdaptor(useFormReturn: UseFormReturn) {
  // useForm의 handleSubmit 코드를 그대로 가져옴
  // useForm 내부에서 진행하는 validation과 validation 이후 error 상태를 삭제하는 코드 제거
  const handleSubmit: HandleSubmitType = useCallback(
    (onValid, onInvalid) => async e => {
      const control = useFormReturn.control;

      if (e) {
        e.preventDefault && e.preventDefault();
        e.persist && e.persist();
      }

      const fieldValues = { ...control._formValues };
      const _subjects = control._subjects;
      const _formState = control._formState;

      _subjects.state.next({
        isSubmitting: true
      });

      if (isEmptyObject(_formState.errors)) {
        _subjects.state.next({
          errors: {}
        });
        await onValid(fieldValues as FieldValue<any>, e);
      } else {
        if (onInvalid) {
          await onInvalid({ ..._formState.errors }, e);
        }
      }

      _subjects.state.next({
        isSubmitted: true,
        isSubmitting: false,
        isSubmitSuccessful: isEmptyObject(_formState.errors),
        submitCount: _formState.submitCount + 1,
        errors: _formState.errors
      });
    },
    [useFormReturn]
  );

  const handleError: HandleErrorType = handleErrorReturn => {
    if (handleErrorReturn.error) {
      useFormReturn.setError(handleErrorReturn.name, {
        message: handleErrorReturn.message || ''
      });
    } else {
      useFormReturn.clearErrors(handleErrorReturn.name);
    }
  };

  return { handleSubmit, handleError };
}

type HandleSubmitType = UseFormHandleSubmit<FieldValue<any>>;

type HandleErrorType = (e: {
  error: boolean;
  name: string;
  message?: string;
}) => void;
