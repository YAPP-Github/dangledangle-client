import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const notiWrap = style({
  marginTop: '16px',
  marginBottom: '20px',
  backgroundColor: palette.gray50,
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 4
});
export const notiLine = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  columnGap: 6
});
export const buttonWrap = style({
  display: 'flex',
  gap: 8
});
