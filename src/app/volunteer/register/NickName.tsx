import EmphasizedTitle, {
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import * as style from './style.css';
import TextField from '@/components/common/TextField/TextField';
import { useFormContext } from 'react-hook-form';

const a = `등록한 파트너 계정의 이메일을 입력해주세요.
비밀번호를 재설정할 수 있는 링크를 보내드립니다.`;

export default function NickName() {
  const methods = useFormContext();
  return (
    <>
      <div className={style.TitleSection}>
        <EmphasizedTitle>
          <Line>안녕하세요!</Line>
          <Line>어떻게 불러드리면 될까요?</Line>
        </EmphasizedTitle>
      </div>
      <div className={style.InputSection}>
        <TextField
          helper={a}
          maxLength={10}
          error={methods.formState.errors?.nickName2}
          {...methods.register('nickName2')}
        />
      </div>
    </>
  );
}
