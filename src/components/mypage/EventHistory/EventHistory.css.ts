import { HEADER_HEIGHT } from '@/components/common/Header/Header.css';
import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const eventContianer = style({
  width: '100%',
  transform: `translateX(-${GLOBAL_PADDING_X}px)`,
  backgroundColor: palette.white,
  maxHeight: 'fit-content',
  padding: '20px 20px 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px'
});

export const chipContainer = style({
  padding: '4px 20px 4px 20px',
  position: 'sticky',
  top: HEADER_HEIGHT,
  backgroundColor: palette.white,
  width: '100%',
  transform: `translateX(-${GLOBAL_PADDING_X}px)`
});
