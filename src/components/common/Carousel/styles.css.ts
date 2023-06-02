import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexWrap: 'nowrap',
  overflow: 'hidden'
});

export const itemsWrapper = style({
  display: 'flex',
  columnGap: '20px'
});
