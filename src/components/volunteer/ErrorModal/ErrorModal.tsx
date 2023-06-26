'use client';
import useDialog from '@/hooks/useDialog';
import { useEffect } from 'react';

export default function ErrorModal({ error }: { error: boolean }) {
  const { dialogOn } = useDialog();

  useEffect(() => {
    if (error)
      dialogOn({
        message: '다시 로그인해주세요',
        close: {}
      });
  }, []);

  return <></>;
}
