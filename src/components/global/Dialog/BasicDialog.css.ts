import { style } from '@vanilla-extract/css';

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  width: '100%'
});

export const buttonWrapper = style({
  display: 'flex',
  gap: 10
});
