import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const item = style({
  boxSizing: 'border-box',
  width: '268px',
  maxWidth: '268px',
  padding: '32px',
  background: palette.gray50,
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  fontSize: '30px'
});
export const carouselText = style({
  marginTop: '24px',
  marginBottom: '4px'
});
