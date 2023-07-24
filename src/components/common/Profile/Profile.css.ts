import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
});
export const circle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: palette.gray100,
  border: `1px solid ${palette.gray200}`,
  width: 24,
  height: 24,
  borderRadius: '50%'
});
export const textWrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px'
});
