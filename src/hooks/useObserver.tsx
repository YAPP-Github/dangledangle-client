import { useCallback, useEffect, useMemo, useRef } from 'react';

export default function useObserver(
  targetElementId: string,
  options?: IntersectionObserverInit
) {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => observer.current?.disconnect();
  }, []);

  const observe = useCallback(
    (onIntersect: Function) => {
      const io = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // 한 번 실행 후 unobserve
            observer.unobserve(entry.target);
            onIntersect();
            break;
          }
        }
      }, options);

      const targetEl = document.getElementById(targetElementId);
      if (!targetEl) {
        console.error(`target DOM 요소를 찾을 수 없습니다`);
        return false;
      }

      observer.current = io;
      io.observe(targetEl);
      return true;
    },
    [options, targetElementId]
  );

  const toggle = useCallback(
    (on: Function, off: Function) => {
      let toggleState = false;

      const targetEl = document.getElementById(targetElementId);
      if (!targetEl) {
        console.error(`target DOM 요소를 찾을 수 없습니다`);
        return false;
      }

      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.rootBounds) {
            toggleState ? on() : off();
            toggleState = !toggleState;
          }
        });
      }, options);

      io.observe(targetEl);
    },
    [options, targetElementId]
  );

  return { observe, toggle };
}
