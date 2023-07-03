import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '20px',
  display: 'flex',
  padding: '16px 0',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: palette.background
});

export const arrowLeft = style({
  cursor: 'pointer'
});
