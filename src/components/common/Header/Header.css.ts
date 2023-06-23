import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '20px',
  display: 'flex',
  padding: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: palette.white,
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  boxShadow: '0 4px 4px 2px rgba(0, 0, 0, 0.03)',
  transform: `translateX(${-GLOBAL_PADDING_X}px)`
});

export const arrowLeft = style({
  cursor: 'pointer'
});
