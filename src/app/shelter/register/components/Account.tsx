import Button from '@/components/common/Button/Button';
import React from 'react';
import { onNextProps } from '../page';

export default function Account({ onNext }: onNextProps) {
  return (
    <main>
      Account 페이지
      <Button onClick={onNext}>다음</Button>
    </main>
  );
}
