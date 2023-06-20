import { ToastStore } from '@/store';
import { useRecoilState } from 'recoil';

export default function useToast() {
  const [toast, setToast] = useRecoilState(ToastStore.state);
  const TIMEOUT_MS = 1000;

  const toastOff = () => setToast(ToastStore.initialState);

  const toastOn = (message: string) => {
    // 토스트를 연속으로 띄울 때 이전 타이머 제거
    clearTimeout(toast.timer);
    setToast({
      visible: true,
      message: message,
      timer: setTimeout(toastOff, TIMEOUT_MS)
    });
  };

  return toastOn;
}
