'use client';

import { useEffect, useRef, useState } from 'react';
import TextField from './TextField';
import { FieldValues, useForm } from 'react-hook-form';
import TextArea from '../TextArea/TextArea';
import useTextFieldFormAdaptor from './hooks/useTextFieldFormAdaptor';

export default function TextFieldExample() {
  const [asyncStatus, setStatus] = useState<{
    status: 'default' | 'active' | 'success' | 'error' | 'loading';
    message: string;
  }>({ status: 'default', message: '제일처음상태, 컴포넌트 init시 전달됨' });

  const ref = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);

  const methods = useForm();
  const { handleSubmit, handleError } = useTextFieldFormAdaptor(methods); //useForm에서 나오는 리턴값 전부 전달.

  const onSubmit = (data: FieldValues) => {
    console.log('성공');
    console.log(data);
  };
  const onError = (...args: any[]) => {
    console.log('Errrrorrrr');
    console.log(methods.control._formState.errors);
  };

  /**
   * 비동기로 TextField 상태 변경 확인을 위해 작성한 hooks
   */
  useEffect(() => {
    setStatus({ status: 'error', message: '에러에러' });
    setTimeout(() => {
      setStatus({ status: 'active', message: '메시지 작성중' });
    }, 1000);
    setTimeout(() => {
      setStatus({ status: 'success', message: '성공' });
    }, 2000);
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      {/* useTextFieldFormAdaptor에서 작성된 handleSubmit 사용 */}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <TextArea
          label="input1 / max적용 / area Height 설정 / 기본 메세지 적용"
          max={12}
          fixHeight="200px"
          defaultValue="123123123"
          placeholder="QHGHGHGHGHGH"
          {...methods.register('input1')} //useForm의 register
          handleError={handleError} // useTextFieldFormAdaptor에서 가져옴
        />
        <TextField
          label="input2 / 전화번호 "
          placeholder="123123"
          message="- 없이 핸드폰 번호를 입력해주세요"
          messageFix // 처음 컴포넌트 랜더링 시 전달된 메시지를 유지하려면 messageFix props로 전달.
          validation={{
            phoneNum: true
          }} //validation
          handleError={handleError}
          {...methods.register('input2')}
        />

        <TextField
          label="input3 / 이모지 / 기본 메시지적용"
          placeholder="123123"
          validation={{
            emoji: true
          }}
          message="이모지이모지이모지1"
          handleError={handleError}
          {...methods.register('input3')} //react-form-hook과 함께 사용
        />
        <TextField
          label="input4 / 이모지 / 커스텀 메시지 적용"
          placeholder="123123"
          validation={{
            emoji: {
              value: true,
              message: '이모지 쓰지마세요~~~~~' // 메세지 커스텀 하려면 {value, message} 형태로 전달
            }
          }}
          message="이모지이모지이모지"
          handleError={handleError}
          {...methods.register('input4')} //react-form-hook과 함께 사용
        />

        <TextField
          label="react-form-hook과 함께 사용하는 폼 2, 이메일 "
          placeholder="123123"
          validation={{ email: true }}
          message="이메일을 입력해주세요"
          handleError={handleError}
          {...methods.register('input5')} //react-form-hook과 함께 사용
        />

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
        <input type="submit"></input>
      </form>
    </div>
  );
}
