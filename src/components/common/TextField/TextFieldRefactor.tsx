'use client';
import React, { ChangeEventHandler, useCallback, useState } from 'react';
import * as styles from './TextFieldRefactor.css';
import clsx from 'clsx';
import { TextFieldRemoveIcon } from '@/asset/icons';
import { Body3, Caption1, Caption2 } from '../Typography';
import useForwardRef from '@/utils/useForwardRef';

/**
 * props 타입, status 타입 정의
 */
interface TextFieldProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  error?: { message: string };
  size?: styles.InputSize;
  helper?: string;
  label?: string;
  maxLength?: number;
}

/**
 * TextField 컴포넌트
 */
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      name,
      size = 'big',
      helper,
      error,
      label,
      onChange,
      maxLength,
      ...inputProps
    },
    ref
  ) {
    if (!ref) throw Error(`${name}에 ref를 추가해주세요`);
    const inputRef = useForwardRef<HTMLInputElement>(ref);

    const [clearable, setClearable] = useState(false);
    const [length, setLength] = useState(0);

    const clearInput = useCallback(() => {
      if (!inputRef.current) return;
      inputRef.current.value = '';
      setClearable(false);
      setLength(0);
    }, []);

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      e => {
        onChange && onChange(e);
        const value = e.target.value;
        setClearable(value.length > 0);
        setLength(value.length);
      },
      []
    );

    return (
      <div arial-lable="text">
        {label && (
          <Caption1 className={styles.label} element="label" color="gray600">
            {label}
          </Caption1>
        )}
        <div className={styles.inputContainer}>
          <input
            ref={inputRef}
            className={styles.input({ size })}
            name={name}
            onChange={handleChange}
            {...inputProps}
          />
          <div className={styles.inputSuffix}>
            <RemoveButton visible={clearable} onClick={clearInput} />
            {maxLength && <LengthCounter max={maxLength} length={length} />}
          </div>
          <div className={styles.underbar({ error: Boolean(error) })} />
        </div>
        <Message error={error?.message} helper={helper} />
      </div>
    );
  }
);
export default TextField;

interface RemoveButtonProps {
  visible: boolean;
  onClick: () => void;
}
const RemoveButton: React.FC<RemoveButtonProps> = ({ visible, onClick }) => {
  return (
    <button onClick={onClick} className={clsx(styles.icon({ visible }))}>
      <TextFieldRemoveIcon />
    </button>
  );
};

/**
 * 글자 수 카운트하는 컴포넌트
 */
interface LengthCounterProps {
  max: number;
  length: number;
}
const LengthCounter: React.FC<LengthCounterProps> = ({ max, length }) => {
  return (
    <Body3 color={length > max ? 'error' : 'gray300'}>
      {length}/{max}
    </Body3>
  );
};
/**
 * 입력 문구 안내 메시지, loading, 오류 메시지 보여주는 컴포넌트
 */

interface MessageProps {
  helper?: string;
  error?: string;
}
const Message: React.FC<MessageProps> = ({ helper, error }) => {
  return (
    <>
      {!error && helper && (
        <Caption2 className={styles.message} color={'gray600'}>
          {helper}
        </Caption2>
      )}
      {error && (
        <Caption2 className={styles.message} color={'error'}>
          {error}
        </Caption2>
      )}
    </>
  );
};
