import EmphasizedTitle, {
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextFieldWithForm from '@/components/common/TextField/TextFieldWithForm';
import * as style from './style.css';

export default function ContactNumber() {
  return (
    <>
      <div className={style.TitleSection}>
        <EmphasizedTitle>
          <Line>연락처를 입력해주세요.</Line>
        </EmphasizedTitle>
      </div>
      <div className={style.InputSection}>
        <TextFieldWithForm name="contactNumber" />
      </div>
    </>
  );
}
