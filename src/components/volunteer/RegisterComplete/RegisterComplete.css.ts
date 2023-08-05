import { style } from '@vanilla-extract/css';

export const container = style({
  height: '100vh',
  bottom: 0,
  left: '0',
  width: '100%',
  borderRadius: 0
});

export const contents = style({
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 20px',
  boxSizing: 'border-box'
});
export const image = style({
  marginTop: '100px'
});

export const titleGroup = style({
  marginTop: '45px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: '10px'
});

export const button = style({
  margin: 'auto 20px 48px 20px'
});
