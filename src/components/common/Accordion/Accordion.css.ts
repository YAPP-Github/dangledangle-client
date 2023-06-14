import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 0',
  cursor: 'pointer'
});

export const titleWrapper = style({
  display: 'flex',
  columnGap: '8px'
});

export const bodyWrapper = style({
  position: 'relative',
  height: 0,
  width: '100%',
  transition: 'all 0.3s ease',
  overflow: 'hidden',

  selectors: {
    '&.open': {
      zIndex: 0
    },
    '&.close': {
      zIndex: -1
    }
  }
});

export const body = style({
  transition: 'all 0.3s ease'
});

export const iconArrow = style({
  transition: 'all 0.3s ease',

  selectors: {
    '&.reversed': {
      transform: 'rotate(180deg)'
    }
  }
});
