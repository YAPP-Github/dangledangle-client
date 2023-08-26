import { HEADER_HEIGHT } from '@/components/common/Header/Header.css';
import { BREAK_POINT, GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const container = style({
  boxSizing: 'border-box',
  maxWidth: BREAK_POINT,
  marginRight: 'auto',
  marginLeft: 'auto',
  height: '100%',
  boxShadow: '0px 1px 5px 1px rgba(0, 0, 0, 0.10)'
});

export const main = style({
  overflow: 'hidden',
  padding: `0 ${GLOBAL_PADDING_X}px`,
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,

  selectors: {
    '&:has(.sticky), &:has(.admin-sticky)': {
      overflow: 'unset'
    }
  }
});
