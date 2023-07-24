import { style } from '@vanilla-extract/css';

export const animalList = style({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '10px',
  marginTop: 12
});

export const imageSection = style({
  marginBottom: 40,
  display: 'flex',
  justifyContent: 'center'
});
