import { palette } from '@/styles/color';
import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const checkBoxColor = createVar('checkBoxColor');

export const container = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '100%'
});

export const label = style({
  marginLeft: '10px'
});

export const checkBox = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: `2px solid`
  },

  variants: {
    checked: {
      true: {
        backgroundColor: [checkBoxColor],
        borderColor: [checkBoxColor]
      },
      false: {
        backgroundColor: palette.white,
        borderColor: palette.gray200
      }
    },
    disabled: {
      true: {
        backgroundColor: palette.gray200,
        cursor: 'not-allowed'
      }
    }
  }
});
