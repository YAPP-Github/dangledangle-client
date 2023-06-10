import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const item = style({
  width: '268px',
  height: '348px',
  background: palette.gray50,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '30px'
});

export const checkBoxDemo = style({
  display: 'flex',
  gap: '12px'
});

export const accordionBody = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '30px',
  backgroundColor: palette.gray50,
  height: '300px'
});
