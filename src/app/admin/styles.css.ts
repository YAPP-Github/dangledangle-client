import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  transform: `translateX(-${GLOBAL_PADDING_X}px)`
});
