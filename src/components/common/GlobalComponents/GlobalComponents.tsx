'use client';
import BasicDialog from '../CofirmDialog/BasicDialog';
import useDialog from '@/hooks/useDialog';

export const GlobalComponents: React.FC = () => {
  const { dialog, dialogOff } = useDialog();
  return (
    <>
      <BasicDialog {...dialog} onClose={dialogOff} />
    </>
  );
};
