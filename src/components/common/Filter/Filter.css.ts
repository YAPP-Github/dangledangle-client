import { palette } from '@/styles/color';
import { BREAK_POINT, GLOBAL_PADDING_X } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '6px 8px 6px 12px',
  borderRadius: '35px',
  border: `1px solid ${palette.gray800}`,
  cursor: 'pointer'
});

export const grid = style({
  display: 'flex',
  gap: '4px'
});
export const sheet = style({
  backgroundColor: `${palette.white} !important`
});
export const sheetContainer = style({
  padding: '0 24px 24px 24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
});
export const label = style({
  padding: '9px 248px 9px 0px',
  width: `calc(100% - ${GLOBAL_PADDING_X}px)`,
  maxWidth: BREAK_POINT,
  borderBottom: `1px solid ${palette.gray100}`
});
export const labelTxt = recipe({
  base: {},
  variants: {
    color: {
      pick: {
        color: palette.gray900
      },
      option: {
        color: palette.gray400
      }
    }
  }
});
