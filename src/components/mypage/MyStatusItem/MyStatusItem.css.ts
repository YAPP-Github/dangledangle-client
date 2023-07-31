import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

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
export const box = style({
  width: `calc(100% - 4 * ${GLOBAL_PADDING_X}px)`,
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '14px 38px 14px 38px',
  backgroundColor: palette.white,
  borderRadius: '8px',
  cursor: 'pointer'
});
