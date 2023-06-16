import { SyntheticEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';

export default function useTextFieldFormAdaptor(useFormReturn: UseFormReturn) {
  // formState에 에러가 존재하는 경우에 handleSubmit 진행되지 않도록 수정

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

  return { handleError, onChange };
}

type HandleErrorType = (e: {
  type?: string | any;
  error: boolean;
  name: string;
  message?: string;
}) => void;

type OnChangeType = (
  name: string
) => (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
