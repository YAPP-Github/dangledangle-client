import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  padding: '16px',
  background: palette.white,
  borderRadius: '8px',
  border: `1px solid ${palette.gray200}`,
  cursor: 'pointer'
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
});

export const badgeWrapper = style({
  display: 'flex',
  columnGap: '8px'
});

export const textClamp = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
  overflow: 'hidden',
  width: '100%'
});

export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
});

export const infoWrapper = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: '6px'
});

export const status = style({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '4px'
});
