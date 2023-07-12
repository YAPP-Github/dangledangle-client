import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const HEADER_HEIGHT = 52;
export const container = style({
  width: '100%',
  display: 'flex',
  position: 'relative',
  padding: '16px 20px',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: palette.background
});

export const arrowLeft = style({
  cursor: 'pointer',
  position: 'absolute',
  zIndex: 1
});

export const title = style({
  flex: 1,
  textAlign: 'center'
});

export const rightSide = style({
  right: 0,
  display: 'flex',
  columnGap: 4
});
