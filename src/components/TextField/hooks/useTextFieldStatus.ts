import { useEffect, useMemo, useState } from 'react';

export type TextFieldStatus =
  | 'default'
  | 'loading'
  | 'active'
  | 'success'
  | 'error';

// eslint-disable-next-line no-unused-vars
type TextFieldMessagesType = { [key in TextFieldStatus]: string };
type TextFieldStatusDto = [TextFieldStatus, string];

function useTextFieldStatus(
  receivedStatus: TextFieldStatusDto = ['default', '']
) {
  const [state, setState] = useState<TextFieldStatusDto>(receivedStatus);

  //가장 최신 message들을 저장
  const cachedMessages = useMemo(
    () => ({
      default: '',
      loading: '',
      active: '',
      success: '',
      error: '입력에 오류가 있습니다.'
    }),
    []
  );

  const textFieldMessages: TextFieldMessagesType = useMemo(() => {
    //state deps로 인해, state가 변경되면서 message가 변경되면 cachedMessages에 저장
    const [status, message] = state;
    if (message) {
      cachedMessages[status] = message;
    }
    return {
      ...cachedMessages,
      loading: cachedMessages.default,
      active: cachedMessages.default
    };
  }, [state, cachedMessages]);

  // input의 길이에 따라 status를 업데이트
  const updateStatusFromInputValue = (input: string) => {
    setState(prev => {
      const status = prev[0];
      if (status === 'error') return ['error', textFieldMessages.error];
      else if (input.length <= 0) return ['default', textFieldMessages.default];
      else return ['active', textFieldMessages.active];
    });
  };

  const setTextFieldStatus = (status: TextFieldStatus, message?: string) => {
    const [prevStatusType, prevMessage] = state;
    if (prevStatusType === status && prevMessage === message) return;
    if (prevStatusType === status && !message) return;
    setState([status, message || textFieldMessages[status]]);
  };

  //파라미터로 받은 status가 변경되면 status를 업데이트
  useEffect(() => {
    setState(receivedStatus);
  }, [receivedStatus[0]]);

  return {
    status: state[0], // status 반환
    message: state[1], // status에 맞는 메세지 반환
    setTextFieldStatus,
    updateStatusFromInputValue
  };
}
export default useTextFieldStatus;
