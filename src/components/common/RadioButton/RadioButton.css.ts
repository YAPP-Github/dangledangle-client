import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  columnGap: '10px'
});

export const radioWrapper = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '85px',
    height: '32px',

    borderRadius: '8px',
    cursor: 'pointer'
  },
  variants: {
    check: {
      false: {
        backgroundColor: palette.white,
        border: `1px solid ${palette.gray300}`
      },
      true: {
        backgroundColor: palette.primary300,
        border: `1px solid ${palette.primary300}`
      }
    }
  }
});

export const label = recipe({
  base: {
    zIndex: 1,
    border: `1px solid transparent`
  },
  variants: {
    check: {
      false: {
        zIndex: 1,
        color: palette.gray500
      },
      true: {
        zIndex: 1,
        color: 'white'
      }
    }
  }
});

export const radio = style({
  borderRadius: '8px',
  position: 'absolute',
  width: '100%',
  height: '100%',
  margin: 0,
  cursor: 'pointer',
  zIndex: -1
});
