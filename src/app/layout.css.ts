import { style } from '@vanilla-extract/css';
import { breakPoint, globalPaddingX } from '@/styles/global.css';

export const container = style({
  boxSizing: 'border-box',
  maxWidth: breakPoint,
  marginRight: 'auto',
  marginLeft: 'auto',
  padding: `0 ${globalPaddingX}px`
});
