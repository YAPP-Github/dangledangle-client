'use client';
import Button from '@/components/common/Button/Button';
import TextArea from '@/components/common/TextArea/TextArea';
import TextField from '@/components/common/TextField/TextField';
import { formatPhoneNumber } from '@/utils/formatInputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormValues = {
  name: string;
  phoneNumber: string;
  address: string;
  description: string;
};

const schema: yup.ObjectSchema<Partial<FormValues>> = yup
  .object()
  .shape({
    name: yup.string().required(),
    phoneNumber: yup
      .string()
      .required('연락처를 입력해주세요.')
      .matches(/^\d{3}-\d{3,4}-\d{4}$/, '유효한 연락처 형식이 아닙니다.'),
    address: yup.string().required('주소를 입력해주세요'),
    description: yup.string().max(300)
  })
  .required();

export default function ShelterEditRequiredPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const handlePhoneChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      event.target.value = formatPhoneNumber(value);
    },
    []
  );

  return (
    <form>
      <TextField label="보호소 이름" {...register('name')} />
      <TextField
        label="보호소 연락처"
        {...register('phoneNumber')}
        onChange={handlePhoneChange}
      />
      <TextArea
        fixHeight="128px"
        max={300}
        label="보호소 소개 문구"
        {...register('description')}
      />
      <Button>저장하기</Button>
    </form>
  );
}
