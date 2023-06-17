'use client';

import { useEffect, useRef } from 'react';
import TextField from '../../components/common/TextField/TextFieldRefactor';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/common/Button/Button';

type FormValues = {
  instagram?: string;
  donationUrl?: string;
  parkingNotice?: string;
  notice?: string;
};

const maxNoticeLength = 1000;
const maxParkingNoticeLength = 300;
const schema: yup.ObjectSchema<FormValues> = yup
  .object()
  .shape({
    instagram: yup
      .string()
      .default('')
      .matches(/https:\/\/www\.instagram\.com\/[\w\.]+$/i, {
        excludeEmptyString: true,
        message: '인스타그램 주소를 다시 확인해주세요'
      })
      .url('유효한 url 형식이 아닙니다.'),
    donationUrl: yup.string().url(),
    parkingNotice: yup.string().max(maxParkingNoticeLength),
    notice: yup.string().max(maxNoticeLength)
  })
  .required();

export default function TextFieldExample() {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ height: '100vh' }}>
      <TextField
        label="인스타그램 계정"
        placeholder="https://www.instagram.com/프로필명"
        error={errors.instagram}
        {...register('instagram')}
      />
      <div>
        <TextField
          label="카카오페이 코드 송금 링크 입력"
          placeholder="카카오페이 코드 송금 링크 입력"
          error={errors.donationUrl}
          {...register('donationUrl')}
        />
      </div>
      <div>
        <TextField
          label="추가 주차 관련 안내 (최대 200자)"
          placeholder="추가 주차 관련 안내 (최대 200자)"
          error={errors.parkingNotice}
          {...register('parkingNotice')}
        />
      </div>
      <Button onClick={handleSubmit(console.log, console.log)}>확인</Button>
      {/* <Button onClick={() =>console.log(errors)} >확인</Button> */}
    </div>
  );
}
