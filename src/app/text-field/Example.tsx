'use client';

import { useEffect, useRef, useState } from 'react';
import TextField from '../../components/common/TextField/TextField';
import { FieldValues, useForm } from 'react-hook-form';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import TextAreaWithForm from '@/components/common/TextArea/TextAreatWithForm';
import TextFieldWithForm from '@/components/common/TextField/TextFieldWIthForm';
import useCustomHAndleSubmit from '@/components/common/TextField/hooks/useCustomHandleSubmit';

export default function TextFieldExample() {
  const [asyncStatus, setStatus] = useState<{
    status: 'default' | 'active' | 'success' | 'error' | 'loading';
    message: string;
  }>({ status: 'default', message: '제일처음상태, 컴포넌트 init시 전달됨' });

  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

  const methods = useForm();
  const handleSubmit = useCustomHAndleSubmit(methods); //useForm에서 나오는 리턴값 전부 전달.

  const onSubmit = (data: FieldValues) => {
    console.log('성공');
    console.log(data);
  };
  const onError = (...args: any[]) => {
    console.log('Errrrorrrr');
    console.log(methods.control._formState.errors);
    console.log(methods.getValues());
  };

  /**
   * 비동기로 TextField 상태 변경 확인을 위해 작성한 hooks
   */
  useEffect(() => {
    // setStatus({ status: 'error', message: '에러에러' });
    setTimeout(() => {
      setStatus({ status: 'active', message: '메시지 작성중' });
    }, 1000);
    setTimeout(() => {
      setStatus({ status: 'success', message: '성공' });
    }, 2000);
    setTimeout(() => {
      setStatus({ status: 'error', message: '에러' });
    }, 3000);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      {/* 
      FormProvider와 사용
      useTextFieldFormAdaptor에서 작성된 handleSubmit 사용 */}
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <TextAreaWithForm
          name="input1"
          label="input1 / max적용 / area Height 설정 / 기본 메세지 적용"
          max={12}
          registerOptions={{ required: 'required 옵션 설정' }}
        />
        <TextFieldWithForm
          name="input2"
          label="input2 / 전화번호 "
          placeholder="123123"
          message="- 없이 핸드폰 번호를 입력해주세요"
          messageFix // 처음 컴포넌트 랜더링 시 전달된 메시지를 유지하려면 messageFix props로 전달.
          validation={{
            phoneNum: true
          }} //validation
        />

        <TextFieldWithForm
          name="input3"
          label="input3 / 이모지 / 기본 메시지적용"
          placeholder="123123"
          validation={{
            emoji: true
          }}
          message="이모지이모지이모지1"
        />
        <TextFieldWithForm
          name="input4"
          label="input4 / 이모지 / 커스텀 메시지 적용"
          placeholder="123123"
          validation={{
            emoji: {
              value: true,
              message: '이모지 쓰지마세요~~~~~' // 메세지 커스텀 하려면 {value, message} 형태로 전달
            }
          }}
          message="이모지이모지이모지"
          registerOptions={{ required: 'required 필요합니다' }} // registerOption 추가
        />

        <TextFieldWithForm
          name="input5"
          label="input5/ 이메일 "
          placeholder="123123"
          validation={{ email: true }}
          message="이메일을 입력해주세요"
        />
        <TextFieldWithForm
          name="input6"
          label="input6 / 외부 상태 전달"
          placeholder="123123"
          validation={{ max: 5 }}
          status={asyncStatus.status}
          message={asyncStatus.message}
        />
        <input type="submit"></input>
      </FormProvider>

      {/* ref에 달아서 사용할 때 */}
      <TextField
        name="인풋3"
        label="인풋5 / 크기가 big인 폼 , max"
        size="big"
        placeholder="123123"
        defaultValue="12312"
        status={asyncStatus.status}
        message={asyncStatus.message}
        validation={{ max: 5, emoji: true }} //validation
        ref={ref}
      />
      <TextField
        name="인풋3"
        label="인풋5 / 크기가 big인 폼 , max"
        size="big"
        placeholder="123123"
        defaultValue="12312"
        status={asyncStatus.status}
        message={asyncStatus.message}
        messageFix // 비동기로 메세지 전달시, 제일 처음에 전달된 메세지를 유지함
        validation={{ max: 5, emoji: true }} //validation
        ref={ref2}
      />
    </div>
  );
}
