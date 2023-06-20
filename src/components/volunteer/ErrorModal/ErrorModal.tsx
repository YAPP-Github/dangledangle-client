'use client';
import ConfirmDialog from '@/components/common/CofirmDialog/ConfirmDialog';
import useBooleanState from '@/hooks/useBooleanState';

export default function ErrorModal({ error }: { error: boolean }) {
  const [open, openDialog, closeDialog] = useBooleanState(error);

  return (
    <ConfirmDialog open={open} onClose={closeDialog}>
      <div>로그인 에러, 다시 로그인해주세요</div>
    </ConfirmDialog>
  );
}
