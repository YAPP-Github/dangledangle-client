'use client';

import { useRef } from 'react';
import TextField from './TextField/TextField';
import { FieldValues, useForm } from 'react-hook-form';

export default function TextFieldForm() {
  const { handleSubmit, control, register } = useForm();
  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

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
          name="인풋3"
          placeholder="123123"
          ref={ref} //useRef와 함께 사용
        />
        <TextField
          name="인풋2"
          label="크기가 big인 폼"
          size="big"
          placeholder="123123"
          validation={{ max: 5 }}
          message="메세지2222"
          ref={ref2}
        />
        <TextField
          label="react-form-hook과 함께 사용하는 폼"
          {...register('인풋1')} //react-form-hook과 함께 사용
          placeholder="123123"
          validation={{ max: 10 }}
          message="메세지111"
        />

        <input type="submit"></input>
      </form>
    </div>
  );
}
