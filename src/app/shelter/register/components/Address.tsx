import React, { useLayoutEffect } from 'react';
import { onNextProps } from '../page';
import Button from '@/components/common/Button/Button';
import { useFormContext } from 'react-hook-form';
import EmphasizedTitle from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { H2 } from '@/components/common/Typography';
import TextField from '@/components/common/TextField/TextField';
import AddressSearchBar from '@/components/shelter-edit/AddressSearchBar/AddressSearchBar';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';

export default function Address({ onNext }: onNextProps) {
  const { register } = useFormContext();

  const setHeader = useSetRecoilState(headerState);
  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      thisPage: 3,
      entirePage: 4
    }));
  }, [setHeader]);

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          marginTop: '40px',
          marginBottom: '160px'
        }}
      >
        <EmphasizedTitle>
          <H2>보호소 주소를 검색해주세요.</H2>
        </EmphasizedTitle>
      </div>
      <AddressSearchBar />
      {/* <TextField
        max={10}
        message={'국문/영문/숫자/띄어쓰기 조합 20자 이내 (특수문자 불가)'}
        placeholder="보호소 주소을 입력해주세요."
        errorCallback={e => console.log(e)}
        {...register('address[0].adress')}
      /> */}
      <Button onClick={onNext} style={{ marginTop: '47px' }}>
        다음
      </Button>
    </div>
  );
}
