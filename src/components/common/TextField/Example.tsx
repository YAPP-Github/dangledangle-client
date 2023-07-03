'use client';

import TextField from './TextField';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@/components/common/Button/Button';
import TextArea from '@/components/common/TextField/TextArea';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import TextFieldWithForm from '@/components/common/TextField/TextFieldWithForm';
import TextAreaWithForm from '@/components/common/TextField/TextAreaWithForm';

type FormValues = {
  instagram?: string;
  donationUrl?: string;
  parkingNotice?: string;
  notice?: string;
};

const maxParkingNoticeLength = 10;
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
    parkingNotice: yup
      .string()
      .max(maxParkingNoticeLength, '123123123123')
      .required(),
    notice: yup.string().max(maxNoticeLength).required()
  })
  .required();

const schema2 = yup
  .object()
  .shape({
    test1: yup
      .string()
      .max(10, '글자 길이는 10을 넘어선 안됩니다.')
      .required('필수 입력사항입니다.'),
    test2: yup.string().email().required('필수 입력사항입니다.'),
    test3: yup
      .string()
      .max(10, '이 메세지는 반영되지 않습니다')
      .required('이 메세지도 반영되지 않습니다.')
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

  const methods2 = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema2)
  });

  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px'
      }}
    >
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
          maxLength={maxParkingNoticeLength}
          error={errors.parkingNotice}
          {...register('parkingNotice')}
        />
      </div>
      <div>
        <TextArea
          label="추가 주차 관련 안내 (최대 10자)"
          placeholder="추가 주차 관련 안내 (최대 10자)"
          maxLength={100}
          error={errors.notice}
          height="200px"
          {...register('notice')}
        />
      </div>

      <FormProvider
        methods={methods2}
        onSubmit={methods2.handleSubmit(onValid, console.log)}
      >
        <TextFieldWithForm
          label={Object.keys(schema2.fields)[0]}
          name={Object.keys(schema2.fields)[0]}
          maxLength={10}
        />
        <TextAreaWithForm
          label={Object.keys(schema2.fields)[1]}
          name={Object.keys(schema2.fields)[1]}
        />

        <TextAreaWithForm
          label={Object.keys(schema2.fields)[2]}
          name={Object.keys(schema2.fields)[2]}
          fixedHelper="고정되는 메시지 테스트 10자 이내 특수문자 이모지 불가 어쩌구"
          maxLength={10}
        />
        <input type="submit"></input>
      </FormProvider>

      <Button onClick={handleSubmit(onValid, console.log)}>확인</Button>
    </div>
  );
}
