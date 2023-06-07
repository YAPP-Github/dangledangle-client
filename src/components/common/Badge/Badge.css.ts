import { palette } from '@/styles/color';
import { recipe } from '@vanilla-extract/recipes';

export const badge = recipe({
  base: {
    width: 'fit-content',
    padding: '2px 4px',
    borderRadius: '4px'
  },
  variants: {
    type: {
      primary: {
        backgroundColor: palette.primary100,
        color: palette.primary300
      },
      gray: {
        backgroundColor: palette.gray200,
        color: palette.gray400
      }
    }
  }
});
