import { useState, useCallback } from 'react';

export default function useBooleanState(initialValue: boolean = false) {
  const [isBooleanState, setBooleanState] = useState(initialValue);

  const toggleBooleanState = useCallback(() => {
    setBooleanState(!isBooleanState);
  }, [isBooleanState]);

  return { isBooleanState, toggleBooleanState };
}
