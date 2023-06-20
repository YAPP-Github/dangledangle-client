import { BREAK_POINT } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const hidden = style({
  bottom: 20,
  opacity: 0
});

export const visible = style({
  bottom: 40,
  opacity: 1
});

export const toastContainer = style({
  zIndex: 1000,
  position: 'fixed',
  height: 38,
  right: 0,
  left: 0,
  marginRight: 'auto',
  marginLeft: 'auto',
  borderRadius: 8,
  background: 'rgba(0, 0, 0, 0.7)',
  pointerEvents: 'none',

  width: 'calc(100% - 60px)',
  maxWidth: BREAK_POINT - 60,

  transitionDuration: '0.3s',
  transitionProperty: 'bottom, opacity'
});

export const messageWrapper = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: 10
});
