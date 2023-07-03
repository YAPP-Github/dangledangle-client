import { useCallback, useRef } from 'react';
import { FieldValues, Path, UseFormSetError } from 'react-hook-form';
import debounce from 'lodash/debounce';
import { isExist } from '@/api/shelter/auth/login';

interface DebounceValidatorProps<TFieldValues extends FieldValues> {
  boolVal?: boolean;
  fieldName: Path<TFieldValues>;
  setError: UseFormSetError<TFieldValues>;
  debounceTime?: number;
  messageType?: string;
  message?: string;
}

function useDebounceValidator<TFieldValues extends FieldValues>({
  boolVal = true,
  fieldName,
  setError,
  debounceTime = 800,
  messageType = 'duplicate',
  message = '이미 등록된 값입니다. 다시 한번 확인해주세요.'
}: DebounceValidatorProps<TFieldValues>) {
  const debouncedValidatorFunc = useRef(
    debounce(async (value: string, type: 'EMAIL' | 'NAME') => {
      try {
        const isInvalid = await isExist(value, type);
        if (isInvalid.isExist === boolVal) {
          setError(fieldName, {
            type: messageType,
            message: message
          });
        }
      } catch (error) {}
    }, debounceTime)
  ).current;

  const debouncedValidator = useCallback(
    (value: string, type: 'EMAIL' | 'NAME') => {
      debouncedValidatorFunc(value, type);
    },
    [debouncedValidatorFunc]
  );

  return debouncedValidator;
}

export default useDebounceValidator;
