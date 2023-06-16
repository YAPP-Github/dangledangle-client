import { SyntheticEvent } from 'react';
import {
  FieldValue,
  UseFormHandleSubmit,
  UseFormReturn
} from 'react-hook-form';
import { isEmptyObject } from '@/utils/isEmptyObject';

export default function useTextFieldFormAdaptor(useFormReturn: UseFormReturn) {
  // formState에 에러가 존재하는 경우에 handleSubmit 진행되지 않도록 수정
  const handleSubmit: HandleSubmitType = (onValid, onInvalid) => async e => {
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
  };

  const handleError: HandleErrorType = handleErrorReturn => {
    if (handleErrorReturn.error) {
      useFormReturn.setError(handleErrorReturn.name, {
        type: handleErrorReturn.type || 'custom',
        message: handleErrorReturn.message || ''
      });
    } else {
      useFormReturn.clearErrors(handleErrorReturn.name);
      useFormReturn.control._subjects.state.next({
        name: handleErrorReturn.name,
        isValid: true,
        errors: {}
      });
    }
  };

  const onChange: OnChangeType = name => e => {
    useFormReturn.setValue(name, e.currentTarget.value);
  };

  return { handleSubmit, handleError, onChange };
}

type HandleSubmitType = UseFormHandleSubmit<FieldValue<any>>;

type HandleErrorType = (e: {
  type?: string | any;
  error: boolean;
  name: string;
  message?: string;
}) => void;

type OnChangeType = (
  name: string
) => (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
