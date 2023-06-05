import { style } from '@vanilla-extract/css';

export const box = style({
  width: '100%',
  height: '56px',
  display: 'flex',
  padding: '20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#ffffff'
});

export const arrowLeft = style({
  cursor: 'pointer'
});

export const headLine = style({
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '22px',
  color: '#000000'
});

export const bodyLine = style({
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '22px',
  color: '#000000'
});
