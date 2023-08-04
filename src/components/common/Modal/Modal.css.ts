import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const header = style({
  marginBottom: 8,
  zIndex: 1,
  position: 'relative',
  height: 24
});

export const closeIcon = style({
  cursor: 'pointer',
  position: 'absolute',
  right: 0
});

export const childrenWarp = style({
  width: '100%',
  height: 'auto',
  backgroundColor: palette.white
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  width: '100%'
});
