'use client';

import { useRef } from 'react';
import TextField from './TextField/TextField';
import { Controller, FieldValues, useForm } from 'react-hook-form';

export default function TextFieldForm() {
  const { handleSubmit, control } = useForm();
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
          name="상준상준"
          label="라벨라벨"
          placeholder="123123"
          validation={{ max: 10 }}
          message="메세세세세"
          ref={ref}
        />
        <Controller
          name="상준상준2"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              placeholder="123123"
              validation={{ max: 5 }}
              ref={ref2}
            />
          )}
        />
        <input type="submit"></input>
      </form>
    </div>
  );
}
