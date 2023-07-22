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

  const attatchObserver = useCallback(
    (onIntersect: Function) => {
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            onIntersect();
            // onIntersect를 실행 후 unobserve
            observer.unobserve(entry.target);
          }
        });
      }, options);

      const targetEl = document.getElementById(targetElementId);
      if (!targetEl || !observer.current) {
        console.error(
          `target DOM 요소(${targetEl})가 없거나 attatchObserver가 호출되지 않았습니다`
        );
        return false;
      }
      observer.current = io;
      io.observe(targetEl);
      return true;
    },
    [options, targetElementId]
  );

  const observe = useCallback(() => {
    const targetEl = document.getElementById(targetElementId);
    if (!targetEl || !observer.current) {
      console.error(
        `target DOM 요소(${targetEl})가 없거나 attatchObserver가 호출되지 않았습니다`
      );
      return false;
    }
    observer.current.observe(targetEl);
    return true;
  }, [targetElementId]);

  return { attatchObserver, observe };
}
