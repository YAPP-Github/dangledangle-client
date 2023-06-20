import Button from '@/components/common/Button/Button';
import React, { useLayoutEffect } from 'react';
import { onNextProps } from '../page';
import { H2 } from '@/components/common/Typography';
import { useSetRecoilState } from 'recoil';
import { headerState } from '@/store/header';
import { Back } from '@/asset/icons';

export default function Complete({ onNext }: onNextProps) {
  const setHeader = useSetRecoilState(headerState);
  useLayoutEffect(() => {
    setHeader(prev => ({
      ...prev,
      title: '',
      thisPage: null,
      entirePage: null
    }));
  }, [setHeader]);

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <H2>필수 정보 입력이</H2>
      <H2>완료되었어요!</H2>

      <Button onClick={onNext} style={{ marginTop: '40px' }}>
        다음
      </Button>
    </div>
  );
}
