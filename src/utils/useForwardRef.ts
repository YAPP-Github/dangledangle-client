import { ForwardedRef, useEffect, useRef } from 'react';

const useForwardRef = <T>(ref: ForwardedRef<T>, initialValue: any = null) => {
  const targetRef = useRef<T | null>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};

export default useForwardRef;
