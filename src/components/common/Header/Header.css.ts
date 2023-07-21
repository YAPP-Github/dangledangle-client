import { createVar, style } from '@vanilla-extract/css';

export const headerColor = createVar('headerColor');

export const HEADER_HEIGHT = 52;
export const container = style({
  position: 'sticky',
  zIndex: 1,
  top: 0,
  width: '100%',
  display: 'flex',
  padding: '16px 20px',
  boxSizing: 'border-box',
  height: '56px',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: headerColor
});

export const arrowLeft = style({
  cursor: 'pointer',
  zIndex: 1
});

export const title = style({
  flex: 1,
  textAlign: 'center'
});

export const rightSide = style({
  position: 'absolute',
  right: 20,
  display: 'flex',
  columnGap: 4
});
