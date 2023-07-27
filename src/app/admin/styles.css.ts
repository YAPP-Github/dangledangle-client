import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  padding: '20px 20px 20px 32px'
});
export const grid = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: '16px',
  marginLeft: '4px',
  cursor: 'pointer'
});
export const box = style({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '14px 38px 14px 39px',
  backgroundColor: palette.white,
  borderRadius: '8px',
  cursor: 'pointer'
});
export const txtGird = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});
export const stroke = style({
  width: '1px',
  height: '60px',
  backgroundColor: palette.gray200,
  margin: '0 22px 0 22px'
});

export const settingSection = style({
  backgroundColor: palette.white,
  margin: '8px 0 0 0'
});
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
  alignItems: 'center'
});
export const noti = style({
  padding: '4px 20px 16px 20px'
});
