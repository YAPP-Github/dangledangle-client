import { redirect } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

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

  const redirectTo = useCallback(
    (path: string) => {
      setRedirectError({
        state: true,
        path
      });
    },
    [setRedirectError]
  );

  useEffect(() => {
    if (redirectError.state && redirectError.path) {
      redirect(redirectError.path);
    }
    return () => setRedirectError(initState);
  }, [redirectError]);

  return redirectTo;
}
