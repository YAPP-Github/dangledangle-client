import { HeaderState, headerState } from '@/store/header';
import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export interface UseHeaderProps extends Omit<HeaderState, 'title'> {
  title?: string;
}

const useHeader = ({
  isHeader,
  isBackArrow,
  title,
  thisPage,
  entirePage,
  RightSideButton
}: UseHeaderProps) => {
  const setHeader = useSetRecoilState(headerState);

  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      isHeader: isHeader || 'visible',
      isBackArrow: isBackArrow || 'visible',
      title: title || prev.title,
      thisPage: thisPage || null,
      entirePage: entirePage || null,
      RightSideButton: RightSideButton || null
    }));
  }, [
    setHeader,
    isHeader,
    isBackArrow,
    title,
    thisPage,
    entirePage,
    RightSideButton
  ]);

  return setHeader;
};

export default useHeader;
