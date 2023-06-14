import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer'
});

export const titleWrapper = style({
  display: 'flex',
  columnGap: '8px',
  marginBottom: '4px'
});

export const divider = style({
  marginTop: '18px'
});
