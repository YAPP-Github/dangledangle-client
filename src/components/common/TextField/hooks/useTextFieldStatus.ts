import { useEffect, useMemo, useState } from 'react';

export type TextFieldStatus =
  | 'default'
  | 'loading'
  | 'active'
  | 'success'
  | 'error';

// eslint-disable-next-line no-unused-vars
type TextFieldMessagesType = { [key in TextFieldStatus]: string };
type TextFieldStateType = {
  status: TextFieldStatus;
  message: string;
};

function useTextFieldStatus({
  status: receivedStatus,
  message: recievedMessage
}: TextFieldStateType) {
  const [textFieldState, setTextFieldState] = useState<TextFieldStateType>({
    status: receivedStatus,
    message: recievedMessage || ''
  });

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

  //state deps로 인해, state나 message가 변경되면 cachedMessages에 최신값 저장
  const textFieldMessages: TextFieldMessagesType = useMemo(() => {
    const { status, message } = textFieldState;
    if (message) {
      cachedMessages[status] = message;
    }
    return {
      ...cachedMessages,
      loading: cachedMessages.default,
      active: cachedMessages.default
    };
  }, [textFieldState, cachedMessages]);

  // input의 길이와 상태 따라 status를 업데이트
  const updateStatusFromInputValue = (input: string) => {
    setTextFieldState(prev => {
      const { status } = prev;
      if (status === 'error') {
        return { status: 'error', message: textFieldMessages.error };
      } else if (input.length <= 0) {
        return { status: 'default', message: textFieldMessages.default };
      } else {
        return { status: 'active', message: textFieldMessages.active };
      }
    });
  };

  //이전 state와 message를 비교해서 상태 업데이트
  const updateTextFieldState = (status: TextFieldStatus, message?: string) => {
    const { status: prevStatusType, message: prevMessage } = textFieldState;
    if (prevStatusType === status && prevMessage === message) return;
    if (prevStatusType === status && !message) return;
    setTextFieldState({
      status,
      message: message || textFieldMessages[status]
    });
  };

  //hook 파라미터 state가 변경되면 업데이트
  useEffect(() => {
    setTextFieldState({ status: receivedStatus, message: recievedMessage });
  }, [receivedStatus, recievedMessage]);

  return {
    status: textFieldState.status, // status 반환
    message: textFieldState.message, // status에 맞는 메세지 반환
    updateTextFieldState,
    updateStatusFromInputValue
  };
}
export default useTextFieldStatus;
