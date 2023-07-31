import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  backgroundColor: palette.white
});
export const accountBox = style({
  padding: '16px 20px 16px 20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer'
});
export const btnWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '66px',
  padding: '12px 6px 12px 6px'
});
export const btnTxt = style({
  textAlign: 'center'
});
