'use client';

import TextField from '../../components/common/TextField/TextFieldRefactor';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/common/Button/Button';

type FormValues = {
  instagram?: string;
  donationUrl?: string;
  parkingNotice?: string;
};

const maxNoticeLength = 10;
const schema: yup.ObjectSchema<FormValues> = yup
  .object()
  .shape({
    instagram: yup
      .string()
      .default('')
      .required()
      .matches(/https:\/\/www\.instagram\.com\/[\w\.]+$/i, {
        excludeEmptyString: true,
        message: '인스타그램 주소를 다시 확인해주세요'
      })
      .url('유효한 url 형식이 아닙니다.'),
    donationUrl: yup.string().url(),
    parkingNotice: yup.string().max(maxNoticeLength, '123123123123').required()
  })
  .required();

export default function TextFieldExample() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div style={{ height: '100vh' }}>
      <TextField
        label="인스타그램 계정"
        placeholder="https://www.instagram.com/프로필명"
        defaultValue="https://www.instagram.com"
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
          label="추가 주차 관련 안내 (최대 10자)"
          placeholder="추가 주차 관련 안내 (최대 10자)"
          maxLength={maxNoticeLength}
          error={errors.parkingNotice}
          {...register('parkingNotice')}
        />
      </div>

      <Button onClick={handleSubmit(onValid, console.log)}>확인</Button>
    </div>
  );
}
