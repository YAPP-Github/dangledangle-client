import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { createVar, style } from '@vanilla-extract/css';

export const dividerHeghit = createVar('dividerHeghit');
export const dividerColor = createVar('dividerColor');

export const eventHeader = style({
  backgroundColor: palette.white,
  padding: '20px',
  width: `calc(100%)`,
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
export const profileImage = style({
  width: 32,
  height: 32,
  borderRadius: '50%',
  border: `1px solid ${palette.gray200}`
});
export const profileWraper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer'
});

export const divider = style({
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  transform: `translateX(${-GLOBAL_PADDING_X}px)`,
  backgroundColor: dividerColor,
  height: dividerHeghit,
  margin: '20px 0'
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: 12
});
export const underline = style({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '22px',
  textDecorationLine: 'underline'
});
