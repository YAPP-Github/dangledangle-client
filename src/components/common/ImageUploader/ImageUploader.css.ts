import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  position: 'relative'
});

export const avartar = style({
  position: 'relative',
  cursor: 'pointer'
});

export const camera = recipe({
  base: {
    position: 'absolute',
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '24px',
    background: palette.gray900,
    bottom: 0,
    right: 0,
    zIndex: 1
  },

  variants: {
    square: {
      true: {
        bottom: '-4px',
        right: '-4px'
      }
    }
  }
});

export const fileInput = style({
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none'
});

export const loadingMask = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: palette.gray200,
  opacity: 0.7,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});
