import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const defaultCircle = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '96px',
  height: '96px',
  margin: 'auto',
  marginTop: 10,
  marginBottom: 10,
  borderRadius: '96px',
  background: palette.gray200
});

export const camera = style({
  position: 'absolute',
  width: '24px',
  height: '24px',
  left: 'calc(50% + 24px)',
  marginTop: '-40px',
  border: 'none',
  borderRadius: '24px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: palette.gray900
});

export const fileInput = style({
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none'
});

export const imageCircle = style({
  display: 'block',
  position: 'relative',
  width: '96px',
  height: '96px',
  margin: 'auto',
  marginTop: 10,
  marginBottom: 10,
  borderRadius: '96px',
  objectFit: 'cover'
});
