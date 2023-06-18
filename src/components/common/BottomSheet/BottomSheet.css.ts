import { BREAK_POINT, GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const panel = style({
  position: 'fixed',
  bottom: 0,
  height: '560px',
  borderRadius: '20px 20px 0px 0px',
  width: 'calc(100% - 40px)',
  maxWidth: BREAK_POINT - 2 * GLOBAL_PADDING_X,
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
  padding: '20px'
});
