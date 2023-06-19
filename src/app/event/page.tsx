'use client';

import { headerState } from '@/store/header';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { useLayoutEffect } from 'react';
import { useAuthContext } from '@/providers/AuthContext';

export default function EventPage() {
  const { accessToken } = useAuthContext();
  console.log(accessToken);
  const setHeader = useSetRecoilState(headerState);

  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      title: '메인 페이지'
    }));
  }, [setHeader]);

  return <div></div>;
}
