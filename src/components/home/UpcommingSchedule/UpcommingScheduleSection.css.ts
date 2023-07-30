import { style } from '@vanilla-extract/css';

export const section = style({
  height: '100%',
  overflow: 'hidden',
  backgroundColor: 'white',
  padding: '28px 20px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '16px'
});

export const sectionTitle = style({});

export const cardList = style({
  width: '100%',
  display: 'flex',
  columnGap: 10,
  overflowX: 'scroll',
  '::-webkit-scrollbar': {
    display: 'none'
  }
});
