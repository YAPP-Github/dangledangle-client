import { style } from '@vanilla-extract/css';

export const footerWrapper = style({
  marginTop: 16,
  padding: '48px 20px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  rowGap: 12
});

export const linkWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: 10,
  opacity: 0.6
});
export const logo = style({
  height: '16px'
});
