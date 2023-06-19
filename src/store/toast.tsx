import { ToastProps } from '@/components/global/Toast/Toast';
import { atom } from 'recoil';

export type ToastState = {
  timer: any;
} & ToastProps;

export const initialState: ToastState = {
  visible: false,
  message: '',
  timer: null
};

export const state = atom({
  key: 'toastState',
  default: initialState
});
