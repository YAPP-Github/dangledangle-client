import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const bottomSheet = style({
  width: '100%',
  height: '70vh',
  left: '0',
  bottom: '0',
  borderBottomLeftRadius: '0',
  borderBottomRightRadius: '0',
  transform: 'translateY(0)'
});

export const wrapper = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  padding: '40px 20px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column'
});

export const allAcceptChecBoxContainer = style({
  display: 'flex',
  margin: '32px 0px',
  width: '100%'
});

export const hr = style({
  width: '100%',
  height: '0px',
  border: `1px solid ${palette.gray300}`
});
export const checkBoxContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  margin: '32px 0px 32px 0px',
  rowGap: '20px'
});
export const checkBox = style({
  flex: 0
});

export const bottomButton = style({
  marginTop: 'auto'
});
