import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const homeLogo = style({
  position: 'absolute',
  top: '36px',
  left: '10px',
  zIndex: 2
});
export const item = style({
  marginTop: '50px',
  width: '268px',
  height: '348px',
  background: palette.gray50,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '30px'
});
export const buttomWrap = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '30px',
  gap: '10px'
});
