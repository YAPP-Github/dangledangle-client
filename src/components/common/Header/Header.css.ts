import { BREAK_POINT, GLOBAL_PADDING_X } from '@/styles/global.css';
import { createVar, style } from '@vanilla-extract/css';

export const headerColor = createVar('headerColor');

export const HEADER_HEIGHT = 52;
export const container = style({
  position: 'sticky',
  zIndex: 1,
  top: 0,
  width: '100%',
  maxWidth: `${BREAK_POINT}px`,
  height: '20px',
  display: 'flex',
  padding: '16px 20px',
  justifyContent: 'space-between',
  alignItems: 'center',
  transform: `translateX(${-GLOBAL_PADDING_X}px)`,
  backgroundColor: headerColor
});

export const arrowLeft = style({
  cursor: 'pointer',
  position: 'absolute',
  zIndex: 1
});

export const title = style({
  flex: 1,
  textAlign: 'center'
});

export const rightSide = style({
  display: 'flex',
  columnGap: 4
});
