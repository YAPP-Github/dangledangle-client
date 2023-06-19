import { ChangeEventHandler, useCallback, useState } from 'react';
import { getStringOfValueLengthPerMax } from '../utils/getStringOfValueLengthPerMax';

interface UseHandleInputValuesProps<
  T extends HTMLInputElement | HTMLTextAreaElement
> {
  input: {
    ref: React.RefObject<T>;
  };
  lengthCount: {
    ref: React.RefObject<HTMLSpanElement>;
    maxLength: number | undefined;
  };
}

export default function useHandleInputValues<
  T extends HTMLInputElement | HTMLTextAreaElement
>({ input, lengthCount }: UseHandleInputValuesProps<T>) {
  const [clearable, setClearable] = useState(false);

  const clearInput = useCallback(() => {
    if (!input.ref.current) return;
    input.ref.current.value = '';
    setClearable(false);

    if (!(lengthCount.ref.current && lengthCount.maxLength)) return;
    lengthCount.ref.current.innerText = getStringOfValueLengthPerMax(
      input.ref.current.value,
      lengthCount.maxLength
    );
    input.ref.current.focus();
  }, []);

  const updateInputValue = useCallback<ChangeEventHandler<T>>(e => {
    if (!input.ref.current) return;
    const value = e.target.value;
    setClearable(value.length > 0);
    if (!(lengthCount.ref.current && lengthCount.maxLength)) return;
    lengthCount.ref.current.innerText = getStringOfValueLengthPerMax(
      input.ref.current.value,
      lengthCount.maxLength
    );
  }, []);

  return { clearable, clearInput, updateInputValue };
}
