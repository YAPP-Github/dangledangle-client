'use client';

import { useEffect, useRef, useState } from 'react';
import TextField from './TextField';
import { FieldValues, useForm } from 'react-hook-form';

export default function TextFieldForm() {
  const { handleSubmit, control, register } = useForm();
  const [async, setStatus] = useState<{
    status: 'default' | 'active' | 'success' | 'error' | 'loading';
    message: string;
  }>({ status: 'default', message: '12312312' });
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);

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
    <div>
      <div
        onClick={() => {
          console.log(control._fields);
        }}
      ></div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="기본 사용 폼"
          name="인풋1"
          placeholder="123123"
          ref={ref} //useRef와 함께 사용
        />

        <TextField
          label="외부에서 error와 메세지를 전달해줄때"
          name="인풋2"
          placeholder="123123"
          status={async.status}
          message={async.message} //useEffect에서 비동기 테스트,
          ref={ref2}
        />
        <TextField
          name="인풋3"
          label="크기가 big인 폼"
          size="big"
          placeholder="123123"
          validation={{ max: 5 }} //validation
          ref={ref3}
        />

        <TextField
          label="react-form-hook과 함께 사용하는 폼 1"
          placeholder="123123"
          validation={{ max: 10 }}
          message="ㅁㄴㅇㄹ"
          errorCallback={error => console.log(error)} //에러 발생 시 name 리턴
          {...register('인풋4')} //react-form-hook과 함께 사용
        />
        <TextField
          label="react-form-hook과 함께 사용하는 폼 2"
          placeholder="123123"
          validation={{ email: true }}
          message="ㅁㄴㅇㄹ"
          {...register('인풋5')} //react-form-hook과 함께 사용
        />

        <input type="submit"></input>
      </form>
    </div>
  );
}
