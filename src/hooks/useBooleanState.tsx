import { useState, useCallback } from 'react';

export default function useBooleanState(initialValue = false) {
  const [isBooleanState, setBooleanState] = useState(initialValue);

  const setBoolTrue = useCallback(() => {
    setBooleanState(true);
  }, []);

  const setBoolFalse = useCallback(() => {
    setBooleanState(false);
  }, []);

  const toggleBooleanState = useCallback(() => {
    setBooleanState(!isBooleanState);
  }, [isBooleanState]);

  return [
    isBooleanState,
    setBoolTrue,
    setBoolFalse,
    toggleBooleanState
  ] as const;
}
