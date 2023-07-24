import { useCallback, useEffect, useRef } from 'react';

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

  return { observe };
}
