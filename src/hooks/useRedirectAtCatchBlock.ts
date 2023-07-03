import { redirect } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import useToast from './useToast';

type RedirctErrorState = {
  state: boolean;
  path: string;
};

const initState: RedirctErrorState = {
  state: false,
  path: ''
};

export default function useRedirectAtCatchBlock() {
  const [redirectError, setRedirectError] =
    useState<RedirctErrorState>(initState);
  const toastOn = useToast();
  const redirectTo = useCallback(
    (path: string, error?: string) => {
      error && toastOn(error);
      setRedirectError({
        state: true,
        path
      });
    },
    [setRedirectError, toastOn]
  );

  useEffect(() => {
    if (redirectError.state && redirectError.path) {
      redirect(redirectError.path);
    }
    return () => setRedirectError(initState);
  }, [redirectError]);

  return redirectTo;
}
