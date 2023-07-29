import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const sheet = style({
  backgroundColor: `${palette.white} !important`
});

export const sheetContainer = style({
  padding: '0 24px 48px 24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
});

export const title = style({
  textAlign: 'center',
  padding: '4px 0 18px 0'
});

export const label = style({
  padding: '9px 248px 9px 0px',
  borderBottom: `1px solid ${palette.gray100}`,
  ':hover': {
    backgroundColor: palette.gray100
  }
});

export const labelTxt = recipe({
  base: {
    width: '100%',
    lineHeight: 'inherit',
    ':hover': {
      color: palette.gray600
    }
  },
  variants: {
    color: {
      pick: {
        color: palette.gray900
      },
      other: {
        color: palette.gray400
      }
    }
  }
});
