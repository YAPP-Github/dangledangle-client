import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const infoWrapper = style({
  display: 'flex',
  columnGap: 10
});

export const contents = style({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  rowGap: 8
});

export const panelWrapper = style({
  padding: '40px 20px',
  backgroundColor: palette.white,
  boxSizing: 'border-box',
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  transform: `translateX(-${GLOBAL_PADDING_X}px)`,
  display: 'flex',
  flexDirection: 'column',
  rowGap: 40
});
