import { palette } from '@/styles/color';
import { BREAK_POINT, GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  transform: `translateX(-${GLOBAL_PADDING_X}px)`
});
export const container = style({
  padding: '20px 20px 32px 20px'
});
export const grid = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: '16px',
  marginLeft: '4px',
  cursor: 'pointer'
});
export const settingSection = style({
  display: 'border-box',
  width: `100%`,
  maxWidth: BREAK_POINT,
  marginLeft: `-${GLOBAL_PADDING_X}px`,
  backgroundColor: palette.white,
  margin: '8px 0 0 0'
});
