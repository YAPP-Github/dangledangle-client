import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const circle = style({
  borderRadius: '100%',
  backgroundColor: palette.white,
  width: 8,
  height: 8
});

export const container = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: 12
});
