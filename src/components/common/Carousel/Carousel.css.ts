import { style } from '@vanilla-extract/css';

export const gap = 20;
export const container = style({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  width: '100%'
});

export const itemsWrapper = style({
  display: 'flex',
  columnGap: `${gap}px`
});
