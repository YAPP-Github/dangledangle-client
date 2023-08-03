import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 8px 6px 12px',
  borderRadius: '35px',
  border: `1px solid ${palette.gray800}`,
  cursor: 'pointer',
  ':hover': {
    backgroundColor: palette.gray200
  }
});

export const grid = style({
  display: 'flex',
  gap: '4px'
});

export const label = style({
  whiteSpace: 'nowrap'
});
