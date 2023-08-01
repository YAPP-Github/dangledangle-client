import { useCallback, useEffect, useState } from 'react';

export function useScroll(bottomOffset = 100, isFetchingNextPage: boolean) {
  const [isNearBottom, setIsNearBottom] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (
      scrollHeight - (scrollTop + clientHeight) <= bottomOffset &&
      !isFetchingNextPage
    ) {
      setIsNearBottom(true);
    } else {
      setIsNearBottom(false);
    }
  }, [bottomOffset, isFetchingNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isFetchingNextPage, handleScroll]);

  return isNearBottom;
}
