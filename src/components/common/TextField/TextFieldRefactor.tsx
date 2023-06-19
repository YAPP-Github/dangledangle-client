'use client';
import React, {
  ChangeEventHandler,
  ForwardedRef,
  useCallback,
  useRef,
  useState
} from 'react';
import * as styles from './TextFieldRefactor.css';
import clsx from 'clsx';
import { TextFieldRemoveIcon } from '@/asset/icons';
import { Caption1, Caption2 } from '../Typography';
import useForwardRef from '@/utils/useForwardRef';
import { getStringOfValueLengthPerMax } from './utils/getStringOfValueLengthPerMax';

/**
 * props 타입, status 타입 정의
 */
interface TextFieldProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'size'> {
  error?: { message?: string };
  size?: styles.InputSize;
  helper?: string;
  label?: string;
  maxLength?: number;
  defaultValue?: string | number;
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
      ...inputProps
    },
    ref
  ) {
    if (!ref) throw Error(`${name}에 ref를 추가해주세요`);
    const inputRef = useForwardRef<HTMLInputElement>(ref);
    const lengthCountRef = useRef<HTMLDivElement>(null);
    const [clearable, setClearable] = useState(false);

    const clearInput = useCallback(() => {
      if (!inputRef.current) return;
      inputRef.current.value = '';
      setClearable(false);

      onChange({
        target: inputRef.current
      } as React.ChangeEvent<HTMLInputElement>);
      inputRef.current.focus();

      if (!lengthCountRef.current) return;
      lengthCountRef.current.innerText = getStringOfValueLengthPerMax(
        inputRef.current.value,
        maxLength
      );
    }, []);

    const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
      e => {
        if (!inputRef.current) return;
        onChange(e);
        const value = e.target.value;
        setClearable(value.length > 0);

        if (!lengthCountRef.current) return;
        lengthCountRef.current.innerText = getStringOfValueLengthPerMax(
          inputRef.current.value,
          maxLength
        );
      },
      []
    );

    const status = error
      ? 'error'
      : Boolean(inputRef?.current?.value.length)
      ? 'active'
      : 'default';

    const message = error?.message || helper || '';

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
            className={styles.input({
              size
            })}
            name={name}
            onChange={handleChange}
            defaultValue={defaultValue}
            {...inputProps}
          />
          <div className={styles.inputSuffix({ status })}>
            <RemoveButton visible={clearable} onClick={clearInput} />
            {maxLength && (
              <LengthCounter
                ref={lengthCountRef}
                initValueLength={String(defaultValue || '').length}
                max={maxLength}
              />
            )}
          </div>
          <div className={styles.underbar({ status })} />
        </div>
        <Message className={styles.message({ status })} message={message} />
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
const LengthCounter = React.forwardRef(function LengthCounter(
  { max, initValueLength }: { max: number; initValueLength: number },
  ref: ForwardedRef<HTMLParagraphElement>
) {
  return (
    <p className={styles.counter} ref={ref}>
      {initValueLength}/{max}
    </p>
  );
});
/**
 * 입력 문구 안내 메시지, loading, 오류 메시지 보여주는 컴포넌트
 */
interface MessageProps {
  className?: string;
  message: string;
}

const Message = ({ className = '', message }: MessageProps) => {
  return (
    <div className={className}>
      <span style={{ whiteSpace: 'pre-wrap' }}>{message}</span>
    </div>
  );
};
