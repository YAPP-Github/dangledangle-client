import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const accountTxt = style({
  display: 'flex',
  flexDirection: 'row',
  columnGap: '8px',
  alignItems: 'center'
});

export const accountBox = style({
  padding: '16px 20px 16px 20px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer'
});

export const noti = style({
  display: 'block',
  padding: '4px 20px 16px 20px'
});
export const divider = style({
  width: '100%',
  backgroundColor: palette.gray200,
  height: '1px',
  margin: '8 0 8 0'
});
