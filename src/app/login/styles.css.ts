import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const homeLogo = style({
  position: 'absolute',
  marginTop: '20px',
  left: '20px',
  zIndex: 2
});
export const item = style({
  marginTop: '40px',
  width: '320px',
  height: '420px',
  background: palette.gray50,
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '30px'
});
export const buttomWrap = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '40px',
  gap: '10px'
});
