import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const base = style({
  color: palette.gray900
});

export const variants = {
  h1: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '36px',
      lineHeight: '46px'
    }
  ]),

  h2: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '34px'
    }
  ]),

  h3: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '24px'
    }
  ]),

  h4: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '22px'
    }
  ]),

  body1: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19px'
    }
  ]),

  body2: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '24px'
    }
  ]),

  body3: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '22px'
    }
  ]),

  body4: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '22px'
    }
  ]),

  button1: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '20px'
    }
  ]),

  button2: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '20px'
    }
  ]),

  caption1: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '18px'
    }
  ]),

  caption2: style([
    base,
    {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '18px'
    }
  ])
};

export type Variant = keyof typeof variants;
