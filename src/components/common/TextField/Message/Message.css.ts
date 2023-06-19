import { palette } from '@/styles/color';
import { recipe } from '@vanilla-extract/recipes';

export const message = recipe({
  base: {
    marginTop: '8px',
    lineHeight: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    verticalAlign: 'middle'
  },
  variants: {
    status: {
      active: {
        color: palette.gray900
      },
      default: {
        color: palette.gray300
      },
      error: { color: palette.error }
    }
  }
});
