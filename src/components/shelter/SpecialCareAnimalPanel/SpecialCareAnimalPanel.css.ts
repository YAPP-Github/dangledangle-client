import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const title = style({
  paddingTop: 40
});
export const panelWrapper = style({
  padding: '40px 20px',
  boxSizing: 'border-box',
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  transform: `translateX(-${GLOBAL_PADDING_X}px)`,
  display: 'flex',
  flexDirection: 'column',
  rowGap: 20
});
