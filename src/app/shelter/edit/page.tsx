'use client';
import ImageUploader from '@/components/common/ImageUploader/ImageUploader';
import { useCallback, useState } from 'react';
import EditMenu from '@/components/shelter-edit/EditMenu/EditMenu';
import Badge from '@/components/common/Badge/Badge';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import Divider from '@/components/common/Divider/Divider';

export default function ShelterEditPage() {
  const [imagePath, setImagePath] = useState<string>('');

  const handleChangeImage = useCallback((fileData?: File) => {
    if (!fileData) setImagePath('');
  }, []);

  const testSchema = yup.object().shape({
    test1: yup.mixed().test('required', '파일을 입력해주세요.', value => {
      if (value instanceof Object) {
        return Object.keys(value).length > 0;
      }
      return false;
    })
  });

  const methods = useForm({
    mode: 'all',
    resolver: yupResolver(testSchema)
  });

  return (
    <FormProvider {...{ methods }}>
      <section>
        <ImageUploader
          imagePath={imagePath}
          name="image"
          onChangeCallback={handleChangeImage}
        />
      </section>
      <section>
        <EditMenu
          title="필수 정보"
          caption="보호소 이름 / 연락처 / 주소 / 소개문구"
          titleSuffix={<Badge type="primary">입력완료</Badge>}
        />
        <Divider spacing={18} />
        <EditMenu
          title="추가 정보"
          caption="SNS계정 / 후원 계좌 정보 / 주차 정보 / 사전 안내사항"
          titleSuffix={<Badge type="gray">미입력</Badge>}
        />
        <Divider spacing={18} />
      </section>
    </FormProvider>
  );
}
