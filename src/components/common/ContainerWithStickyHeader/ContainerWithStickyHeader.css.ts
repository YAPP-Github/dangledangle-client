import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  backgroundColor: palette.white,
  display: 'flex',
  flexDirection: 'column'
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
