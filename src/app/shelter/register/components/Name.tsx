import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { H2 } from '@/components/common/Typography';
import { useFormContext } from 'react-hook-form';
import { onNextProps } from '../page';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';
import { useLayoutEffect } from 'react';
import TextField from '@/components/common/TextField/TextField';

export default function Name({ onNext }: onNextProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const setHeader = useSetRecoilState(headerState);
  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      title: '필수정보',
      thisPage: 1,
      entirePage: 4
    }));
  }, [setHeader]);

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          marginTop: '40px',
          marginBottom: '126px'
        }}
      >
        <EmphasizedTitle>
          <H2>안녕하세요!</H2>
          <H2>보호소 이름을 입력해주세요.</H2>
        </EmphasizedTitle>
      </div>
      <TextField
        maxLength={20} //validation에는 적용되지 않음, yup Schema에 적용 해야함
        fixedHelper={'국문/영문/숫자/띄어쓰기 조합 20자 이내 (특수문자 불가)'}
        placeholder="보호소 이름을 입력해주세요."
        {...register('name')}
        error={errors['name']}
      />
      <Button onClick={onNext} style={{ marginTop: '47px' }}>
        다음
      </Button>
    </div>
  );
}
