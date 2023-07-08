import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  position: 'sticky',
  top: 0
});
export const sticky = style({
  position: 'sticky',
  top: 0,
  zIndex: 1
});

export const hidden = style({
  opacity: 0
});

export const fadeIn = style({
  transition: '0.2s ease-in-out',
  opacity: 1
});
