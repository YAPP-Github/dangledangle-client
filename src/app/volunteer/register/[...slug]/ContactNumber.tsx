import EmphasizedTitle, {
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextFieldWithForm from '@/components/common/TextField/TextFieldWithForm';
import * as style from './style.css';
import { CurrentComponentProps } from './CurrentComponentTypes';

export default function ContactNumber({ formName }: CurrentComponentProps) {
  return (
    <>
      <div className={style.TitleSection}>
        <EmphasizedTitle>
          <Line>연락처를 입력해주세요.</Line>
        </EmphasizedTitle>
      </div>
      <div className={style.InputSection}>
        {formName && <TextFieldWithForm name={formName} />}
      </div>
    </>
  );
}
