import { globalStyle } from '@vanilla-extract/css';
import 'vanilla-reset';
import { palette } from './color';

globalStyle('body', { backgroundColor: palette.background });
globalStyle('ul, ol, li', { listStyle: 'none' });
globalStyle('.page', { marginTop: '20px' });
export const BREAK_POINT = 600;
export const GLOBAL_PADDING_X = 20;
