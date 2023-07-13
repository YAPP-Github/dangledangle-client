import { useCallback, useEffect, useRef, useState } from 'react';

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
      if (!targetEl)
        throw Error(
          `useObserver > startObserve: id가 ${targetElementId}인 DOM 요소가 없습니다`
        );

      observer.current = io;
      io.observe(targetEl);
    },
    [options, targetElementId]
  );

  const observe = useCallback(() => {
    const targetEl = document.getElementById(targetElementId);
    if (!targetEl || !observer.current) {
      throw Error(
        `target DOM 요소(${targetEl})가 없거나 attatchObserver가 호출되지 않았습니다`
      );
    }
    observer.current.observe(targetEl);
  }, [targetElementId]);

  return { attatchObserver, observe };
}
