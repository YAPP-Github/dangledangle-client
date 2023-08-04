import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const floatingButton = style({
  position: 'fixed',
  bottom: 32,
  zIndex: 1000,
  margin: '0 auto',
  left: 0,
  right: 0,
  width: 'fit-content',

  cursor: 'pointer',
  borderRadius: 100,
  background: palette.primary300,
  boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.15)',
  padding: '12px 16px 12px 18px'
});

export const inner = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export const prefixIcon = style({
  width: 16,
  height: 16,
  marginRight: 4
});
