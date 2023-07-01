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
  RightSideComponent
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
      RightSideComponent: RightSideComponent || null
    }));
  }, [
    setHeader,
    isHeader,
    isBackArrow,
    title,
    thisPage,
    entirePage,
    RightSideComponent
  ]);

  return setHeader;
};

export default useHeader;
