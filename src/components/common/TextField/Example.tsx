'use client';

import { useEffect, useRef, useState } from 'react';
import TextField from './TextField';
import { FieldValues, useForm } from 'react-hook-form';
import TextArea from '../TextArea/TextArea';

export default function TextFieldExample() {
  const { handleSubmit, control, register } = useForm();
  const [asyncStatus, setStatus] = useState<{
    status: 'default' | 'active' | 'success' | 'error' | 'loading';
    message: string;
  }>({ status: 'default', message: '' });
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLTextAreaElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const ref4 = useRef<HTMLInputElement>(null);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  useEffect(() => {
    setStatus({ status: 'loading', message: '로딩중입니다' });
    setTimeout(() => {
      setStatus({ status: 'error', message: '에러입니다' });
    }, 1000);
    setTimeout(() => {
      setStatus({ status: 'success', message: '성공!' });
    }, 2000);
    setTimeout(() => {
      setStatus({ status: 'error', message: '실패!' });
    }, 3000);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      <div
        onClick={() => {
          console.log(control._fields);
        }}
      ></div>
      <TextArea
        label="123"
        max={12}
        fixHeight="200px"
        defaultValue="123123123"
        message={'기본메세지'}
        placeholder="QHGHGHGHGHGH"
        errorCallback={e => console.log(e)}
        name="123"
        ref={ref2}
      />
      <TextArea
        label="123"
        max={12}
        defaultValue="123123123"
        message={'기본메세지'}
        placeholder="QHGHGHGHGHGH"
        errorCallback={e => console.log(e)}
        {...register('area')}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around'
        }}
      >
        <TextField
          label="기본 사용 폼"
          name="인풋1"
          placeholder="123123"
          message="아아아아"
          validation={{ max: 5 }} //validation
          ref={ref} //useRef와 함께 사용
        />

        <TextField
          name="인풋3"
          label="크기가 big인 폼"
          size="big"
          placeholder="123123"
          defaultValue="12312"
          validation={{ max: 5 }} //validation
          ref={ref3}
        />

        <TextField
          label="외부에서 error와 메세지를 전달해줄때"
          name="인풋2"
          placeholder="123123"
          status={asyncStatus.status}
          message={asyncStatus.message} //useEffect에서 비동기 테스트,
          ref={ref4}
        />
        {/* 
        <TextField
          label="react-form-hook과 함께 사용하는 폼 1, input 문자 수 / 인풋4"
          placeholder="123123"
          validation={{ max: 10 }}
          message="ㅁㄴㅇㄹ"
          errorCallback={error => console.log(error)} //에러 발생 시 name 리턴
          {...register('인풋4')} //react-form-hook과 함께 사용
        />
        <TextField
          label="react-form-hook과 함께 사용하는 폼 2, 이메일 / 인풋5"
          placeholder="123123"
          validation={{ email: true }}
          message="ㅁㄴㅇㄹ"
          {...register('인풋5')} //react-form-hook과 함께 사용
        />  */}

        <input type="submit"></input>
      </form>
    </div>
  );
}
