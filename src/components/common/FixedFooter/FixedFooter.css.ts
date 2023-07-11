import { BREAK_POINT, GLOBAL_PADDING_X } from '@/styles/global.css';
import { createVar, style } from '@vanilla-extract/css';

export const footerColor = createVar('footerColor');

export const fixedFooter = style({
  position: 'fixed',
  bottom: 0,
  right: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  zIndex: 1
});

export const wrapper = style({
  maxWidth: `${BREAK_POINT}px`,
  width: '100%',
  padding: `10px ${GLOBAL_PADDING_X}px 30px`,
  backgroundColor: footerColor,
  boxShadow: '0px -1px 5px 1px rgba(0, 0, 0, 0.1)'
});
