import EmphasizedTitle, {
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextField from '@/components/common/TextField/TextField';
import { formatPhone } from '@/utils/formatInputs';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { CurrentComponentProps } from './CurrentComponentTypes';
import * as style from './style.css';

export default function ContactNumber({ formName }: CurrentComponentProps) {
  const { register } = useFormContext();
  const handlePhoneNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      event.target.value = formatPhone(value);
    },
    []
  );

  return (
    <>
      <div className={style.titleSection}>
        <EmphasizedTitle>
          <Line>연락처를 입력해주세요.</Line>
        </EmphasizedTitle>
      </div>
      <div className={style.InputSection}>
        {formName && (
          <TextField
            placeholder="연락처를 입력하세요 (- 제외)"
            {...register(formName, { onChange: handlePhoneNumberChange })}
          />
        )}
      </div>
    </>
  );
}
