import Button from '@/components/common/Button/Button';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import TextField from '@/components/common/TextField/TextField';
import { H2 } from '@/components/common/Typography';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export default function Description() {
  const { register } = useFormContext();
  return (
    <div>
      <EmphasizedTitle>
        <H2>거의 다 됐어요!</H2>
        <H2>보호소를 소개해주세요.</H2>
      </EmphasizedTitle>
      <TextField
        max={10}
        message={'국문/영문/숫자/띄어쓰기 조합 20자 이내 (특수문자 불가)'}
        placeholder="보호소 이름을 입력해주세요."
        errorCallback={e => console.log(e)}
        {...register('description')}
      />
      <Button>저장하기</Button>
    </div>
  );
}
