import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const gap = 20;

export const container = style({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  paddingLeft: GLOBAL_PADDING_X,
  transform: `translateX(${-GLOBAL_PADDING_X}px)`
});

export const itemsWrapper = style({
  display: 'flex',
  columnGap: `${gap}px`
});
