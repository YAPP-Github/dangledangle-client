import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const contianer = style({
  width: '100%',
  transform: `translateX(-${GLOBAL_PADDING_X}px)`,
  backgroundColor: palette.white,
  maxHeight: 'fit-content',
  padding: '24px 20px 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});
