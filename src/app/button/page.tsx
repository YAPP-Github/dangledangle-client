'use client';
import EmphasizedTitle, {
  Line,
  E
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import Button from '@/components/common/button/Button';
import { useState } from 'react';

export default function ButtonPage() {
  const [state, setState] = useState<boolean>(false);
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
      }}
    >
      <EmphasizedTitle>
        <Line>
          <E>보호소 파트너</E>로
        </Line>
        <Line>가입하시는게 맞는지</Line>
        <Line>확인해주세요🔥</Line>
      </EmphasizedTitle>

      <Button>버튼1</Button>
      <div>
        acitve 테스트
        <div style={{ display: 'flex' }}>
          <Button
            id="ididid"
            style={{ backgroundColor: 'blue' }}
            onClick={() => setState(prev => !prev)}
          >
            클릭해보세요
          </Button>
          <Button disabled={state}>버튼</Button>
        </div>
      </div>
    </div>
  );
}
