import { BREAK_POINT } from '@/styles/global.css';
import { createVar, style } from '@vanilla-extract/css';

export const bottomSheetLeft = createVar('bottomSheetLeft');

export const panel = style({
  position: 'fixed',
  bottom: -5,
  left: [bottomSheetLeft],
  height: '560px',
  borderRadius: '20px 20px 0px 0px',
  width: '100%',
  maxWidth: BREAK_POINT,
  margin: 'auto',
  backgroundColor: 'rgb(255, 255, 255)',
  boxShadow: `0px 0px 10px #888888`,
  zIndex: 100
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 100
});

export const childrenWrap = style({
  marginTop: '40px',
  padding: '22px'
});
