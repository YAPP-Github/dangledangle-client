import { style } from '@vanilla-extract/css';

export const section = style({
  height: '100%',
  overflow: 'hidden',
  backgroundColor: 'white',
  paddingTop: '28px',
  paddingBottom: '28px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '16px'
});

export const cardList = style({
  width: '100%',
  display: 'flex',
  columnGap: 10,
  overflowX: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none'
  }
});
