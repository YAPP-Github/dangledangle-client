import { BasicDialogProps } from '@/components/global/Dialog/BasicDialog';
import { atom } from 'recoil';

export type DialogState = Omit<BasicDialogProps, 'onClose'>;
export const initialState: DialogState = {
  open: false,
  message: ''
};

export const state = atom({
  key: 'dialog',
  default: initialState
});
