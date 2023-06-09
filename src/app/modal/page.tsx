'use client';

import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import ConfirmDialog from '@/components/common/CofirmDialog/ConfirmDialog';
import Header from '@/components/common/Header/Header';
import ImageUploader from '@/components/common/ImageUploader/ImageUploader';
import useBooleanState from '@/hooks/useBooleanState';
import { CONFIRM_MSG } from '@/utils/setting/settingConstEnum';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function LoginPage() {
  const [isDialog, isOpenDialog, isCloseDialog] = useBooleanState();
  const [isSheet, isOpenSheet, isCloseSheet] = useBooleanState();

  const testSchema = yup.object().shape({
    test1: yup.mixed().test('required', '파일을 입력해주세요.', value => {
      if (value instanceof Object) {
        return Object.keys(value).length > 0;
      }
      return false;
    }),
    test2: yup.mixed().test('required', '파일을 입력해주세요.', value => {
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
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Header title="로그인" thisPage={0} entirePage={5} />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ImageUploader name="test1" help />
          <ImageUploader name="test2" help />

          <div style={{ height: '100px' }}></div>
          <button type="submit">저장</button>
        </form>
      </FormProvider>

      <button onClick={isOpenSheet}>Open Bottom Sheet</button>
      <BottomSheet isOpened={isSheet} onClose={isCloseSheet} />

      <div>
        <button onClick={isOpenDialog}>Open Modal</button>

        <ConfirmDialog
          open={isDialog}
          onClose={isCloseDialog}
          actionButton
          actionTitle="저장"
          message={CONFIRM_MSG.common.updateSave}
          onActionClick={() => console.log('hello')}
        >
          {/* 크기 늘어난 모달 확인용 */}
          {/* <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ImageUploader name="test3" help />
              <ImageUploader name="test4" help />
              <ImageUploader name="test5" help />
              <ImageUploader name="test6" help />

              <div style={{ height: '100px' }}></div>
              <button type="submit">저장</button>
            </form>
          </FormProvider> */}
        </ConfirmDialog>
      </div>
    </>
  );
}
