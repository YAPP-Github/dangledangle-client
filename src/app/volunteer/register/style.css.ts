import { style } from '@vanilla-extract/css';

export const wrapper = style({
  boxSizing: 'border-box',
  padding: '40px 0px'
});

export const TitleSection = style({
  height: '194px'
});

export const InputSection = style({
  height: '60px'
});

export const CompletePage = style({
  position: 'absolute',
  top: '0px',
  left: '0px',
  height: '100%',
  width: '100%',
  zIndex: '10',
  backgroundColor: 'white'
});
