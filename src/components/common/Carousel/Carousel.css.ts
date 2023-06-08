import { globalPaddingX } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const gap = 20;

export const container = style({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  paddingLeft: globalPaddingX,
  transform: `translateX(${-globalPaddingX}px)`
});

export const itemsWrapper = style({
  display: 'flex',
  columnGap: `${gap}px`
});
