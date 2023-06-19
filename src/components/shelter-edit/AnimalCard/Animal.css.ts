import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '16px',
  gap: '10px',
  height: '180px',
  background: palette.white,
  borderRadius: '8px'
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
  border: `0.5px solid ${palette.gray200}`,
  marginTop: '10px',
  marginBottom: '10px'
});

export const textClamp = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden'
});

export const buttonWarp = style({
  display: 'flex',
  width: '100%',
  columnGap: '12px',
  alignItems: 'end',
  justifyContent: 'end',
  marginTop: '10px'
});

export const button = style({
  width: '61px',
  height: '34px',
  borderRadius: '4px'
});
