'use client';
import BasicDialog from '../Dialog/BasicDialog';
import useDialog from '@/hooks/useDialog';
import { useRecoilState } from 'recoil';
import { ToastStore } from '@/store';
import { Toast } from '@/components/global/Toast/Toast';

export const GlobalComponents: React.FC = () => {
  const { dialog, dialogOff } = useDialog();
  const [toast] = useRecoilState(ToastStore.state);

  return (
    <>
      <BasicDialog {...dialog} onClose={dialogOff} />
      <Toast visible={toast.visible} message={toast.message} />
    </>
  );
};
