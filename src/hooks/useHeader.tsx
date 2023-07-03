import { headerState } from '@/store/header';
import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';

interface HeaderProps {
  isHeader?: 'hidden' | 'visible';
  isBackArrow?: 'hidden' | 'visible';
  title?: string;
  thisPage?: number;
  entirePage?: number;
}
const useHeader = ({
  isHeader,
  isBackArrow,
  title,
  thisPage,
  entirePage
}: HeaderProps) => {
  const setHeader = useSetRecoilState(headerState);

  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      isHeader: isHeader || 'visible',
      isBackArrow: isBackArrow || 'visible',
      title: title || prev.title,
      thisPage: thisPage || null,
      entirePage: entirePage || null
    }));
  }, [setHeader, isHeader, isBackArrow, title, thisPage, entirePage]);

  return setHeader;
};

export default useHeader;
