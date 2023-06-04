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
  Heading1,
  Heading2,
  Heading3,
  Heading4
} from '@/components/common/typography';

export default function Typography() {
  return (
    <>
      <Heading1 color="gray900">다람쥐 헌 쳇바퀴에 타고파</Heading1>
      <Heading2 color="gray800">다람쥐 헌 쳇바퀴에 타고파</Heading2>
      <Heading3 color="gray700">다람쥐 헌 쳇바퀴에 타고파</Heading3>
      <Heading4 color="gray600">다람쥐 헌 쳇바퀴에 타고파</Heading4>
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
