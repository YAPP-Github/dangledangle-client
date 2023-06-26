import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const titleWrapper = style({
  marginTop: '40px'
});
export const subWrapper = style({
  display: 'flex',
  columnGap: '10px',
  marginBottom: '9px'
});
export const content = style({
  width: '100%',
  background: '#F8F8F8',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
});
export const check = style({
  display: 'flex',
  justifyContent: 'center'
});

export const post = style({
  height: '390px',
  overflowY: 'hidden'
});

export const carouselText = style({
  marginTop: '24px',
  marginBottom: '4px'
});
export const carouselBtnWrap = style({
  display: 'flex',
  justifyContent: 'center'
});
export const carouselBtnText = style({
  marginTop: '16px',
  cursor: 'pointer'
});

export const item = style({
  boxSizing: 'border-box',
  width: '268px',
  maxWidth: '268px',
  padding: '32px',
  background: palette.gray50,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  fontSize: '30px'
});

export const bottomContent = style({
  padding: '20px'
});

export const divider = style({
  width: '100%',
  height: '1px',
  backgroundColor: palette.gray300,
  marginTop: '32px',
  marginBottom: '32px'
});
export const allCheck = style({
  display: 'flex',
  marginTop: '32px',
  columnGap: '8px'
});
export const checkBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
});
