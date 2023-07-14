import { style } from '@vanilla-extract/css';
import { BREAK_POINT, GLOBAL_PADDING_X } from '@/styles/global.css';

export const container = style({
  boxSizing: 'border-box',
  maxWidth: BREAK_POINT,
  marginRight: 'auto',
  marginLeft: 'auto',
  padding: `0 ${GLOBAL_PADDING_X}px 30px`
});
