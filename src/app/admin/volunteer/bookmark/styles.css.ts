import { HEADER_HEIGHT } from '@/components/common/Header/Header.css';
import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const contianer = style({
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  transform: `translateX(-${GLOBAL_PADDING_X}px)`,
  backgroundColor: palette.white,
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`
});
