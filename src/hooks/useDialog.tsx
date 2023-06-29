import { DialogStore } from '@/store';
import { useRecoilState } from 'recoil';

export default function useDialog() {
  const [dialog, setDialog] = useRecoilState(DialogStore.state);
  const dialogOff = () => {
    setDialog(DialogStore.initialState);
  };

  const dialogOn = (dialogSetting: Omit<DialogStore.DialogState, 'open'>) => {
    dialogOff();
    setTimeout(() => {
      setDialog({
        open: true,
        ...dialogSetting
      });
    }, 0);
  };

  const setDialogLoading = (value: boolean) => {
    setDialog(prev => ({
      ...prev,
      loading: value
    }));
  };

  return { dialog, dialogOn, dialogOff, setDialogLoading };
}
