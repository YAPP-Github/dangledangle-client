import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  columnGap: '10px'
});

export const radioWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '85px',
  height: '32px',
  border: `1px solid ${palette.gray300}`,
  borderRadius: '8px',
  cursor: 'pointer'
});

export const label = recipe({
  base: {},
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
  selectors: {
    [`${radioWrapper} &:checked`]: {
      background: palette.primary300,
      border: `1px solid ${palette.primary300}`,
      transitionDuration: '0.4s'
    }
  }
});
