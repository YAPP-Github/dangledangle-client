import { style } from '@vanilla-extract/css';

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: 32
});

export const label = style({
  display: 'block',
  marginBottom: 8
});

export const iterationNotice = style({
  display: 'block',
  transform: 'translateY(-8px)'
});
