import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  display: 'flex',
  columnGap: 24
});

export const profileImage = style({
  width: 80,
  height: 80,
  borderRadius: '50%'
});

export const contents = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  rowGap: 10
});

export const buttons = style({
  display: 'flex',
  columnGap: 6
});
