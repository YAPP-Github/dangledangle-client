import { useEffect, useMemo, useState } from 'react';

export type TextFieldStatus =
  | 'default'
  | 'loading'
  | 'active'
  | 'success'
  | 'error';

// eslint-disable-next-line no-unused-vars
const defaultMessages: { [key in TextFieldStatus]: string } = {
  default: '올바른 값을 입력해주세요',
  loading: '로딩중입니다',
  active: '활성화 되었습니다',
  success: '입력 성공!',
  error: '입력에 오류가 있습니다.'
};

function useTextFieldStatus(
  receivedStatus: TextFieldStatus = 'default',
  customMessages?: Partial<typeof defaultMessages>
) {
  const [status, setStatus] = useState<TextFieldStatus>(receivedStatus);

  const textFieldMessages = useMemo(
    () => ({
      ...defaultMessages,
      default: customMessages?.default || defaultMessages.default,
      active: customMessages?.default || defaultMessages.default,
      loading: customMessages?.default || defaultMessages.default, // loading, active는 dafult와 같이 처리
      error: customMessages?.error || defaultMessages.error,
      success: customMessages?.success || defaultMessages.success
    }),
    [customMessages]
  );

  const updateStatusFromInput = (input: string) => {
    setStatus(prev => {
      if (prev === 'error') return 'error';
      else if (input.length <= 0) return 'default';
      else return 'active';
    });
  };

  //파라미터로 받은 status 적용
  useEffect(() => {
    setStatus(receivedStatus);
  }, [receivedStatus]);

  return {
    status,
    message: textFieldMessages[status], // status에 맞는 메세지 반환
    setStatus,
    updateStatusFromInput
  };
}
export default useTextFieldStatus;
