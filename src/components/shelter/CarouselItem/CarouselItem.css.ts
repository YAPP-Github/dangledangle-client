import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const item = style({
  width: '220px',
  maxWidth: '284px',
  padding: '32px 24px 32px 24px',
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
export const image = style({
  position: 'relative'
});
export const extra = style({
  position: 'absolute',
  left: '685px'
});
