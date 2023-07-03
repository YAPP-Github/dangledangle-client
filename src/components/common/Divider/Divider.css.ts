import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { createVar, style } from '@vanilla-extract/css';

export const marginTop = createVar('marginTop');
export const marginBottom = createVar('marginBottom');
export const divider = style({
  height: '1px',
  backgroundColor: palette.gray300,
  transform: `translateX(-${GLOBAL_PADDING_X}px)`,
  marginTop,
  marginBottom
});
