'use client';

import Button from '@/components/common/Button/Button';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import TextField from '@/components/common/TextField/TextField';
import useHeader from '@/hooks/useHeader';
import { formatPhone, removeDash, phoneRegex } from '@/utils/formatInputs';
import yup from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/providers/AuthContext';
import useMyInfo from '@/api/mypage/useMyInfo';
import { MyVolInfo } from '@/api/mypage/mypage';
import { isEmpty } from 'lodash';
import useUpdateVolInfo from '@/api/mypage/useUpdateVolInfo';
import { useRouter } from 'next/navigation';
import useToast from '@/hooks/useToast';
import { isShelterInfo } from '@/components/mypage/MyPageMain/MyPageMain';

interface UpdateMyVolInfo extends Pick<MyVolInfo, 'nickName' | 'phoneNumber'> {}

const validation = yup.object().shape({
  nickName: yup
    .string()
    .max(10)
    .required()
    .test(
      'no-emoji',
      '이모티콘은 사용할 수 없습니다',
      (value = '') =>
        !/(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu.test(
          value || ''
        )
    ),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, '숫자만 입력해주세요')
    .test(
      'phone-format-validation',
      '전화번호 형식이 올바르지 않습니다',
      value => {
        let val = removeDash(value || '');
        if (!val || (val && val.length <= 3)) {
          return true;
        }

        const result = val.slice(0, 2);
        const phone = val.slice(2);

        if (result === '02' && (phone.length === 7 || phone.length <= 8)) {
          return true;
        } else if (
          phone.length === 7 ||
          phone.length === 8 ||
          phone.length === 9
        ) {
          return true;
        } else {
          return false;
        }
      }
    )
});

export default function MyPageForVolunteer() {
  useHeader({ title: '계정 관리' });
  const router = useRouter();
  const toastOn = useToast();
  const { dangle_role } = useAuthContext();
  const { data: info } = useMyInfo(dangle_role, { enabled: !!dangle_role });

  const handlePhoneNumberChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      event.target.value = formatPhone(value);
    },
    []
  );

  const method = useForm<UpdateMyVolInfo>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(validation),
    defaultValues: !isShelterInfo(info!)
      ? {
          nickName: info?.nickName,
          phoneNumber: formatPhone(info?.phoneNumber || '')
        }
      : {}
  });
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit
  } = method;

  const { mutateAsync } = useUpdateVolInfo();
  const onVaild = (data: UpdateMyVolInfo) => {
    const payload = {
      ...data,
      phoneNumber: removeDash(data.phoneNumber),
      alarmEnabled: !isShelterInfo(info!) ? info?.alarmEnabled ?? true : true
    };
    mutateAsync(payload).then(res => {
      toastOn('계정 정보가 업로드 되었습니다.');
      router.push('/admin');
    });
  };

  return (
    <FormProvider methods={method} onSubmit={handleSubmit(onVaild)}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          marginTop: '24px'
        }}
      >
        <TextField
          label="닉네임"
          {...register('nickName')}
          error={errors.nickName}
        />
        <TextField
          label="연락처"
          {...register('phoneNumber', { onChange: handlePhoneNumberChange })}
          error={errors.phoneNumber}
        />
      </div>

      <Button
        disabled={!isDirty || !isEmpty(errors)}
        style={{ marginTop: '239px' }}
        type="submit"
      >
        수정하기
      </Button>
    </FormProvider>
  );
}
