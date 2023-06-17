import Button from '@/components/common/Button/Button';
import React from 'react';
import { onNextProps } from '../page';

export default function Sure({ onNext }: onNextProps) {
  return (
    <div>
      Are you Sure?
      <Button onClick={onNext}>다음</Button>
    </div>
  );
}
