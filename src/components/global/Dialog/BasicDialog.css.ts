import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: palette.white
});

export const buttonWrapper = style({
  display: 'flex',
  gap: 10,
  backgroundColor: palette.white
});
