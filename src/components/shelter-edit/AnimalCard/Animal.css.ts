import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  gap: '10px',
  background: palette.white,
  borderRadius: '8px'
});

export const image = style({
  borderRadius: 4
});

export const aniCard = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: '12px',
  width: '100%'
});

export const divider = style({
  boxSizing: 'border-box',
  width: '100%',
  height: '0px',
  border: `0.5px solid ${palette.gray200}`
});

export const textClamp = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  width: '100%'
});

export const textFull = style({
  width: '100%',
  textAlign: 'start'
});

export const buttonWarp = style({
  display: 'flex',
  width: '100%',
  columnGap: '12px',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  marginTop: '10px'
});

export const button = style({
  width: '61px',
  height: '34px',
  borderRadius: '4px'
});
