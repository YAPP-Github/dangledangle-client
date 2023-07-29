import { palette } from '@/styles/color';
import { GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const fullWidth = style({
  transform: `translateX(-${GLOBAL_PADDING_X}px)`,
  width: '100%',
  paddingLeft: GLOBAL_PADDING_X + 'px',
  paddingRight: GLOBAL_PADDING_X + 'px'
});

export const calendarFooter = style([
  fullWidth,
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: palette.white,
    paddingBottom: 20
  }
]);

export const foldedHeader = style([
  fullWidth,
  {
    position: 'relative',
    padding: `20px ${GLOBAL_PADDING_X}px 14px`,
    textAlign: 'center',
    backgroundColor: palette.white
  }
]);

export const toggleItem = style({
  display: 'flex',
  columnGap: 4,
  alignItems: 'center',
  cursor: 'pointer'
});

export const headerFoldToggle = style({
  position: 'absolute',
  top: 20,
  right: GLOBAL_PADDING_X
});
