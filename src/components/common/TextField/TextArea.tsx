'use client';
import React, { ChangeEventHandler, useCallback, useMemo, useRef } from 'react';
import { Caption1 } from '../Typography';
import useForwardRef from '@/utils/useForwardRef';
import useHandleInputValues from './hooks/useHandleInputs';
import LengthCounter from './LengthCounter/LengthCounter';
import Message from './Message/Message';
import * as styles from './TextField.css';

/**
 * props 타입, status 타입 정의
 */
export interface TextAreaProps
  extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'size'> {
  name: string;
  error?: { message?: string };
  size?: styles.InputSize;
  helper?: string;
  label?: string;
  maxLength?: number;
  defaultValue?: string | number;
  height?: string;
  fixedHelper?: string;
}

/**
 * TextArea 컴포넌트
 */
const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea(
    {
      name,
      size = 'small',
      helper,
      error,
      label,
      onChange = () => {},
      maxLength,
      height,
      defaultValue,
      fixedHelper,
      required,
      ...inputProps
    },
    ref
  ) {
    if (!ref) throw Error(`${name}에 ref를 추가해주세요`);
    const textAreaRef = useForwardRef<HTMLTextAreaElement>(ref);
    const lengthCountRef = useRef<HTMLDivElement>(null);
    const fixedHelperMessage = useMemo(() => fixedHelper, []);

    const { updateInputValue } = useHandleInputValues({
      input: {
        ref: textAreaRef
      },
      lengthCount: {
        ref: lengthCountRef,
        maxLength
      }
    });

    const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
      e => {
        onChange(e);
        updateInputValue(e);
      },
      []
    );

    const status = error
      ? 'error'
      : Boolean(textAreaRef?.current?.value.length)
      ? 'active'
      : 'default';

    const message = fixedHelperMessage || error?.message || helper || '';

    return (
      <div arial-lable={`${name}-text-area`}>
        {label && (
          <Caption1 className={styles.label} element="label" color="gray600">
            {label} {required && <Caption1 color="primary300">*</Caption1>}
          </Caption1>
        )}
        <div
          className={styles.textAreaContainer({ status })}
          style={{ height: height }}
        >
          <textarea
            ref={textAreaRef}
            className={styles.textInput({
              size
            })}
            name={name}
            onChange={handleChange}
            defaultValue={defaultValue}
            {...inputProps}
          />
        </div>
        <div className={styles.textAreaSuffix({ status })}>
          <Message style={{ marginTop: 0 }} status={status} message={message} />
          {maxLength && (
            <LengthCounter
              style={{ fontSize: '12px' }}
              ref={lengthCountRef}
              initValueLength={String(defaultValue || '').length}
              max={maxLength}
            />
          )}
        </div>
      </div>
    );
  }
);
export default TextArea;
