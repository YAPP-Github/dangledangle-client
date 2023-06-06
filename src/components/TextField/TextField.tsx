'use client';
import React, {
  ForwardedRef,
  ChangeEventHandler,
  MouseEventHandler,
  MutableRefObject,
  useRef,
  FocusEventHandler,
  useState
} from 'react';
import * as style from './TextField.css';
import useValidation, { ValidationArgs } from './hooks/useValidation';

interface TextFieldProps {
  name: string;
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

const TextField = React.forwardRef(function TextField(
  {
    onChange,
    onBlur,
    name,
    label,
    placeholder,
    message,
    validation
  }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const lengthCountRef = useRef<HTMLSpanElement>(null);
  const forwardRef = ref as MutableRefObject<HTMLInputElement>;
  const [status, setStatus] = useState<TextFieldStatus>('default');
  const { validate } = useValidation(validation);

  const max = validation?.max || null;

  const handleRemoveClick: MouseEventHandler<HTMLButtonElement> = e => {
    if (e.currentTarget.type === 'button') e.preventDefault();
    if (!forwardRef.current) return;
    if (!lengthCountRef.current) return;

    forwardRef.current.value = '';
    forwardRef.current.placeholder = placeholder || '';
    lengthCountRef.current.innerText = `${forwardRef.current.value.length}/${max}`;
    setStatus('default');
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = e => {
    if (!(forwardRef.current && placeholder)) return;
    if (forwardRef.current.value.length <= 0) {
      forwardRef.current.placeholder = placeholder;
    }
    setStatus(prev => (prev === 'error' ? 'error' : 'default'));
    onBlur && onBlur(e);
  };
  const handleFocus: FocusEventHandler<HTMLInputElement> = () => {
    if (!forwardRef.current) return;
    if (forwardRef.current.value === '') {
      forwardRef.current.placeholder = '';
    }
    setStatus('active');
  };
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = async e => {
    if (!lengthCountRef.current) return;
    const forwardRef = ref as unknown as MutableRefObject<HTMLInputElement>;
    lengthCountRef.current.innerText = `${forwardRef.current.value.length}/${max}`;
    onChange && onChange(e);

    if (!(await validate(forwardRef.current.value))) return setStatus('error');
    setStatus('active');
  };

  return (
    <div
      className={`${style.wrapper} ${style.inputTypeRecipe({ status })}`}
      arial-lable="text"
    >
      <label className={style.label}> {label || ''}</label>
      <div className={style.inputContainer}>
        <input
          ref={ref}
          className={`${style.input}`}
          name={name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
        />
        <button onClick={handleRemoveClick}> 삭제 </button>
        {max && <Count max={max} ref={lengthCountRef} />}
        <div className={style.underbar} />
      </div>
      <span className={style.message}>{message}</span>
    </div>
  );
});
export default TextField;

/**
 * 글자 수를 카운트하는 컴포넌트
 */
const Count = React.forwardRef(function Count(
  { max }: { max: number | string },
  ref: ForwardedRef<HTMLSpanElement>
) {
  return <span ref={ref} className={style.count}>{`0/${max}`}</span>;
});
