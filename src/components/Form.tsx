'use client';

import { useEffect, useRef, useState } from 'react';
import TextField from './TextField/TextField';
import { FieldValues, useForm } from 'react-hook-form';

export default function TextFieldForm() {
  const { handleSubmit, control, register } = useForm();
  const [asyncStatus, setStatus] = useState<{
    status: 'default' | 'active' | 'success' | 'error' | 'loading';
    message: string;
  }>({ status: 'default', message: '12312312' });
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

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
          {...asyncStatus}
          ref={ref} //useRef와 함께 사용
        />
        <TextField
          name="인풋2"
          label="크기가 big인 폼"
          size="big"
          placeholder="123123"
          validation={{ max: 5 }}
          {...asyncStatus}
          ref={ref2}
        />
        <TextField
          label="react-form-hook과 함께 사용하는 폼"
          {...register('인풋3')} //react-form-hook과 함께 사용
          placeholder="123123"
          validation={{ max: 10 }}
          message="ㅁㄴㅇㄹ"
        />

        <input type="submit"></input>
      </form>
    </div>
  );
}
