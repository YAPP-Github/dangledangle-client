import { style } from '@vanilla-extract/css';
import { breakPoints } from '@/styles/theme';

export const container = style({
  maxWidth: breakPoints,
  marginRight: 'auto',
  marginLeft: 'auto',
  paddingRight: '20px',
  paddingLeft: '20px'
});
