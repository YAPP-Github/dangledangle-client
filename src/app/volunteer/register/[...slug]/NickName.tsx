import EmphasizedTitle, {
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import * as style from './style.css';
import TextFieldWithForm from '@/components/common/TextField/TextFieldWithForm';

export default function NickName() {
  return (
    <>
      <div className={style.TitleSection}>
        <EmphasizedTitle>
          <Line>안녕하세요!</Line>
          <Line>어떻게 불러드리면 될까요?</Line>
        </EmphasizedTitle>
      </div>
      <div className={style.InputSection}>
        <TextFieldWithForm
          name="nickname"
          helper={'10자 이내 국문/영문/숫자/특수문자 가능 (이모지 불가)'}
          maxLength={10}
        />
      </div>
    </>
  );
}
