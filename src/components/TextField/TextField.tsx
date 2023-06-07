'use client';
import React, {
  ForwardedRef,
  ChangeEventHandler,
  MouseEventHandler,
  useRef,
  FocusEventHandler,
  useState,
  useMemo
} from 'react';
import * as style from './TextField.css';
import useValidation, { ValidationArgs } from './hooks/useValidation';
import { variants } from '../common/typography/Typography.css';
import clsx from 'clsx';

/**
 * props 타입, status 타입 정의
 */
interface TextFieldProps {
  name: string;
  size?: 'big' | 'small';
  label?: string;
  placeholder?: string;
  validation?: ValidationArgs;
  message?: string;

  // eslint-disable-next-line no-unused-vars
  onChange?: (e: React.SyntheticEvent) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (e: React.SyntheticEvent) => void;
}

type TextFieldStatus = 'default' | 'active' | 'success' | 'error';

/**
 * TextField 컴포넌트
 */
const TextField = React.forwardRef(function TextField(
  {
    name,
    size = 'small',
    label,
    message,
    placeholder,
    validation,
    onChange,
    onBlur
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  //forwardRef로 받는 경우, ref 전달 여부를 체크를 해주지 않아서 throw 하도록 추가,
  if (!ref) throw Error(`${name}에 ref를 추가해주세요`);

  const [status, setStatus] = useState<TextFieldStatus>('default');
  const lengthCountRef = useRef<HTMLDivElement>(null);
  const inputRef = useMemo<{ current: HTMLInputElement | null }>(
    (current = null) => ({ current }),
    []
  );

  const { validate } = useValidation(validation);
  const max = validation?.max;

  const handleRemoveClick: MouseEventHandler<HTMLButtonElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!inputRef.current) return;
    inputRef.current.value = '';

    if (placeholder) {
      inputRef.current.placeholder = placeholder || '';
    }
    if (lengthCountRef.current) {
      lengthCountRef.current.innerText = `${inputRef.current.value.length}/${max}`;
    }
    onChange && onChange(e);
    setStatus('default');
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = e => {
    if (!inputRef.current) return;

    if (inputRef.current.value.length <= 0 && placeholder) {
      inputRef.current.placeholder = placeholder;
    }
    setStatus(prev =>
      prev === 'error'
        ? 'error'
        : inputRef.current!.value.length <= 0
        ? 'default'
        : 'active'
    );
    onBlur && onBlur(e);
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
    if (!inputRef.current) return;

    if (inputRef.current.value === '') {
      inputRef.current.placeholder = '';
    }
    setStatus(prev =>
      prev === 'error'
        ? 'error'
        : inputRef.current!.value.length <= 0
        ? 'default'
        : 'active'
    );
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = async e => {
    if (!inputRef.current) return;

    if (lengthCountRef.current) {
      lengthCountRef.current.innerText = `${inputRef.current.value.length}/${max}`;
    }
    onChange && onChange(e);

    if (!(await validate(inputRef.current.value))) return setStatus('error');
    setStatus('active');
  };

  return (
    <div
      className={clsx([style.inputTypeRecipe({ status }), style.wrapper])}
      arial-lable="text"
    >
      {label && (
        <label className={clsx([style.label, variants.caption1])}>
          {label}
        </label>
      )}

      <div className={style.inputContainer}>
        <input
          ref={node => {
            inputRef.current = node; // TextField 내부의 inputRef 사용
            if (typeof ref === 'function') ref(node); // RefCallback이 오는 경우, 적용
          }}
          className={style.input({ size })}
          name={name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
        />
        <button onClick={handleRemoveClick}>x</button>
        {max && <Count max={max} ref={lengthCountRef} />}
        <div className={style.underbar} />
      </div>
      <p className={clsx([style.message, variants.caption2])}>{message}</p>
    </div>
  );
});
export default TextField;

/**
 * 글자 수 카운트하는 컴포넌트
 */
const Count = React.forwardRef(function Count(
  { max }: { max: number | string },
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className={clsx([style.count, variants.body3])}>
      {`0/${max}`}
    </div>
  );
});
