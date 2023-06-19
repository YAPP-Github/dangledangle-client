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
        <TextFieldWithForm
          name="contactNum"
          fixedHelper="10자 이내 국문/영문/숫자/특수문자 가능 (이모지 불가)"
        />
      </div>
    </>
  );
}
