'use client';
import Button from '@/components/common/Button/Button';
import TextArea from '@/components/common/TextArea/TextArea';
import TextField from '@/components/common/TextField/TextField';
import AddressSearchBar from '@/components/shelter-edit/AddressSearchBar/AddressSearchBar';
import { formatPhone } from '@/utils/formatInputs';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import * as yup from 'yup';
import * as styles from './styles.css';
import { Caption1 } from '@/components/common/Typography';

type FormValues = {
  name: string;
  phone: string;
  address: string;
  description: string;
};

const schema: yup.ObjectSchema<Partial<FormValues>> = yup
  .object()
  .shape({
    name: yup.string().required('보호소 이름을 입력해주세요'),
    phone: yup
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
      event.target.value = formatPhone(value);
    },
    []
  );

  const onSubmit = (data: FormValues | FieldErrors<FormValues>) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit, onSubmit)}>
      <div className={styles.container}>
        <TextField label="보호소 이름" {...register('name')} />
        <TextField
          label="보호소 연락처"
          {...register('phone')}
          onChange={handlePhoneChange}
        />
        <div>
          <Caption1 element={'label'} color="gray600">
            보호소 주소
          </Caption1>
          <AddressSearchBar />
          <TextField {...register('address')} />
        </div>
        <TextArea
          fixHeight="128px"
          max={300}
          label="보호소 소개 문구"
          {...register('description')}
        />
      </div>
      <Button className={styles.button} itemType="submit">
        저장하기
      </Button>
    </form>
  );
}
