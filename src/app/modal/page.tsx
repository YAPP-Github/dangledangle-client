'use client';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import Button from '@/components/common/Button/Button';
import ConfirmDialog from '@/components/common/CofirmDialog/ConfirmDialog';
import FormProvider from '@/components/common/FormProvider/FormProvider';
import Header from '@/components/common/Header/Header';
import ImageUploader from '@/components/common/ImageUploader/ImageUploader';
import useBooleanState from '@/hooks/useBooleanState';
import { CONFIRM_MSG } from '@/utils/setting/settingConstEnum';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export default function ModalPage() {
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
  const { handleSubmit, register } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <Header title="로그인" thisPage={0} entirePage={5} />

      <FormProvider {...{ methods }} onSubmit={handleSubmit(onSubmit)}>
        <ImageUploader name="test1" />
        <ImageUploader name="test2" />

        <div style={{ height: '100px' }}></div>
        <button type="submit">저장</button>
      </FormProvider>

      <button onClick={isOpenSheet}>Open Bottom Sheet</button>
      <BottomSheet isOpened={isSheet} onClose={isCloseSheet} />

      <div>
        <button onClick={isOpenDialog}>Open Modal</button>

        <ConfirmDialog
          open={isDialog}
          onClose={isCloseDialog}
          message={CONFIRM_MSG.common.updateSave}
          actionButton={
            <>
              <Button onClick={isCloseDialog}>저장</Button>
              <Button onClick={isCloseDialog}>닫기</Button>
            </>
          }
        >
          {/* 크기 늘어난 모달 확인용 */}
          {/* <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ImageUploader name="test3" help />
            <ImageUploader name="test4" help />
            <div style={{ height: '100px' }}></div>
          </FormProvider> */}
        </ConfirmDialog>
      </div>
    </>
  );
}
