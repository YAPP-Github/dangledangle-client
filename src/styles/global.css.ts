import { globalStyle, style } from '@vanilla-extract/css';
import 'vanilla-reset';
import { palette } from './color';

globalStyle('body', { backgroundColor: palette.gray50 });
globalStyle('main, footer', { backgroundColor: palette.background });
globalStyle('ul, ol, li', { listStyle: 'none' });
globalStyle('.page', { marginTop: '20px' });

export const BREAK_POINT = 440;
export const GLOBAL_PADDING_X = 20;
export const FOOTER_HEIGHT = 144;

export const expandGlobalPadding = style({
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  transform: `translateX(-${GLOBAL_PADDING_X}px)`,
  maxWidth: BREAK_POINT,
  paddingLeft: `${GLOBAL_PADDING_X}px`,
  paddingRight: `${GLOBAL_PADDING_X}px`,
  boxSizing: 'border-box'
});
