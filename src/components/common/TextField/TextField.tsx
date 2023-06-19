'use client';
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef
} from 'react';
import * as styles from './TextField.css';
import { Caption1 } from '../Typography';
import useForwardRef from '@/utils/useForwardRef';
import useHandleInputValues from './hooks/useHandleInputs';
import RemoveButton from './RemoveButton/RemoveButton';
import LengthCounter from './LengthCounter/LengthCounter';
import Message from './Message/Message';

/**
 * props 타입, status 타입 정의
 */
export interface TextFieldProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  name: string;
  error?: { message?: string };
  size?: styles.InputSize;
  helper?: string;
  label?: string;
  maxLength?: number;
  defaultValue?: string | number;
  fixedHelper?: string;
}

/**
 * TextField 컴포넌트
 */
const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      name,
      size = 'small',
      helper,
      error,
      label,
      onChange = () => {},
      maxLength,
      defaultValue,
      fixedHelper,
      ...inputProps
    },
    ref
  ) {
    if (!ref) throw Error(`${name}에 ref를 추가해주세요`);
    const inputRef = useForwardRef<HTMLInputElement>(ref);
    const lengthCountRef = useRef<HTMLDivElement>(null);
    const fixedHelperMessage = useMemo(() => fixedHelper, []);

    const { clearable, clearInput, updateInputValue } = useHandleInputValues({
      input: {
        ref: inputRef
      },
      lengthCount: {
        ref: lengthCountRef,
        maxLength
      }
    });

    const handleClick = useCallback<MouseEventHandler<HTMLButtonElement>>(e => {
      e.stopPropagation();
      e.preventDefault();

      onChange({
        target: inputRef.current
      } as React.ChangeEvent<HTMLInputElement>);
      clearInput();
    }, []);

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      e => {
        onChange(e);
        updateInputValue(e);
      },
      []
    );

    const status = error
      ? 'error'
      : Boolean(inputRef?.current?.value.length)
      ? 'active'
      : 'default';

    const message = fixedHelperMessage || error?.message || helper || '';

    return (
      <div arial-lable={`${name}-text-field`}>
        {label && (
          <Caption1 className={styles.label} element="label" color="gray600">
            {label}
          </Caption1>
        )}
        <div className={styles.textFieldContainer}>
          <input
            ref={inputRef}
            className={styles.textInput({
              size
            })}
            name={name}
            onChange={handleChange}
            defaultValue={defaultValue}
            {...inputProps}
          />

          <div className={styles.textFieldSuffix({ status })}>
            <RemoveButton visible={clearable} onClick={handleClick} />
            {maxLength && (
              <LengthCounter
                ref={lengthCountRef}
                initValueLength={String(defaultValue || '').length}
                max={maxLength}
              />
            )}
          </div>
          <div className={styles.textFieldUnderbar({ status })} />
        </div>
        <Message status={status} message={message} />
      </div>
    );
  }
);
export default TextField;
