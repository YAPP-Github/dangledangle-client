import { style } from '@vanilla-extract/css';
import {
  BREAK_POINT,
  FOOTER_HEIGHT,
  GLOBAL_PADDING_X
} from '@/styles/global.css';
import { HEADER_HEIGHT } from '@/components/common/Header/Header.css';

export const container = style({
  boxSizing: 'border-box',
  maxWidth: BREAK_POINT,
  marginRight: 'auto',
  marginLeft: 'auto',
  height: '100%',
  boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.10)'
});

export const main = style({
  overflow: 'auto',
  padding: `0 ${GLOBAL_PADDING_X}px`,
  minHeight: `calc(100vh - ${FOOTER_HEIGHT}px - ${HEADER_HEIGHT}px)`
});
