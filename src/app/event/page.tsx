'use client';

import { headerState } from '@/store/header';
import { useLayoutEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export default function EventPage() {
  const setHeader = useSetRecoilState(headerState);

  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      title: '메인 페이지'
    }));
  }, [setHeader]);

  return <div></div>;
}
