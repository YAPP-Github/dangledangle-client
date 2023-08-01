import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  backgroundColor: palette.white,
  borderRadius: '8px',
  border: `1px solid ${palette.gray200}`,
  padding: '16px 20px 16px 20px',
  display: 'border-box',
  cursor: 'pointer'
});
export const txtLine = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});
export const avartar = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px'
});
export const textClamp = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
  overflow: 'hidden',
  width: '100%',
  margin: '20px 0px 12px 0px'
});
