import { style } from '@vanilla-extract/css';

export const bottomSheet = style({
  height: '100vh',
  bottom: 0,
  // left: '0',
  width: '100%',
  borderRadius: 0
});

export const contents = style({
  height: '90vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});
export const image = style({
  marginTop: '100px'
});

export const titleGroup = style({
  marginTop: '45px',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center'
});

export const button = style({
  margin: 'auto 0 48px 0'
});
