import { style } from '@vanilla-extract/css';
import { breakPoint } from '@/styles/global.css';

export const container = style({
  maxWidth: breakPoint,
  marginRight: 'auto',
  marginLeft: 'auto',
  paddingRight: '20px',
  paddingLeft: '20px'
});
