import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const circle = recipe({
  base: {
    borderRadius: '100%',
    width: 8,
    height: 8
  },
  variants: {
    color: {
      basic: {
        backgroundColor: palette.white
      },
      primary: {
        backgroundColor: palette.primary400
      }
    }
  }
});

export const container = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  columnGap: 12
});
