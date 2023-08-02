import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 20px 20px 13px',
  borderBottom: `1px solid ${palette.gray200}`
});
export const avartar = style({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  gap: '8px'
});
export const star = style({
  cursor: 'pointer'
});
