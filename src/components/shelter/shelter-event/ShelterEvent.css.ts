import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { createVar, style } from '@vanilla-extract/css';

export const dividerHeghit = createVar('dividerHeghit');

export const eventHeader = style({
  backgroundColor: palette.white,
  padding: '20px',
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  transform: `translateX(${-GLOBAL_PADDING_X}px)`
});
export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px'
});
export const badgeWrapper = style({
  display: 'flex',
  columnGap: '8px'
});
export const title = style({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '28px'
});
export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
});
export const infoWrapper = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: '6px'
});
export const divider = style({
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  transform: `translateX(${-GLOBAL_PADDING_X}px)`,
  backgroundColor: palette.gray50,
  height: dividerHeghit,
  margin: '20px 0'
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12
});
