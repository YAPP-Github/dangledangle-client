import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  height: '20px',
  display: 'flex',
  position: 'relative',
  padding: '16px 0',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: palette.background
});

export const arrowLeft = style({
  cursor: 'pointer',
  position: 'absolute'
});

export const title = style({
  flex: 1,
  textAlign: 'center'
});

export const rightSide = style({
  position: 'absolute',
  right: 0
});
