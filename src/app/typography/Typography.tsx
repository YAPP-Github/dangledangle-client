'use client';

import {
  Body1,
  Body2,
  Body3,
  Body4,
  ButtonText1,
  ButtonText2,
  Caption1,
  Caption2,
  H1,
  H2,
  H3,
  H4
} from '@/components/common/Typography';

export default function Typography() {
  return (
    <>
      <H1 color="gray900">다람쥐 헌 쳇바퀴에 타고파</H1>
      <H2 color="gray800">다람쥐 헌 쳇바퀴에 타고파</H2>
      <H3 color="gray700">다람쥐 헌 쳇바퀴에 타고파</H3>
      <H4 color="gray600">다람쥐 헌 쳇바퀴에 타고파</H4>
      <Body1 color="gray500">다람쥐 헌 쳇바퀴에 타고파</Body1>
      <Body2 color="gray400">다람쥐 헌 쳇바퀴에 타고파</Body2>
      <Body3 color="gray300">다람쥐 헌 쳇바퀴에 타고파</Body3>
      <Body4 color="gray200">다람쥐 헌 쳇바퀴에 타고파</Body4>
      <ButtonText1 color="primary300" style={{ display: 'flex' }}>
        다람쥐 헌 쳇바퀴에 타고파
      </ButtonText1>
      <ButtonText2 color="primary200" style={{ display: 'flex' }}>
        다람쥐 헌 쳇바퀴에 타고파
      </ButtonText2>
      <Caption1 color="primary100" style={{ display: 'flex' }}>
        다람쥐 헌 쳇바퀴에 타고파
      </Caption1>
      <Caption2 color="error" style={{ display: 'flex' }}>
        다람쥐 헌 쳇바퀴에 타고파
      </Caption2>
    </>
  );
}
