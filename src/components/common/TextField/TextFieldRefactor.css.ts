import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { palette } from '@/styles/color';
import { variants } from '../Typography/Typography.css';

export const label = style({
  display: 'block',
  marginBottom: '6px'
});

export const inputContainer = style({
  height: '30px',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  boxSizing: 'border-box'
});

export const input = recipe({
  base: {
    width: '100%',

    '::placeholder': {
      color: palette.gray300
    }
  },

  variants: {
    size: {
      big: variants.h3,
      small: variants.body2
    }
  }
});

export const message = style({
  display: 'block',
  marginTop: '8px'
});

export const underbar = recipe({
  base: {
    position: 'absolute',
    width: '100%',
    borderBottom: `1px solid ${palette.gray200}`,
    bottom: '0px',

    selectors: {
      [`input:focus + &, input:active + &`]: {
        borderBottom: `1px solid ${palette.gray900}`
      }
    }
  },
  variants: {
    error: {
      true: {
        borderBottom: `1px solid ${palette.error} !important`
      }
    }
  }
});

export const inputSuffix = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: '12px'
});

export const icon = recipe({
  base: {
    height: '24px',
    visibility: 'hidden',
    cursor: 'pointer'
  },
  variants: {
    visible: {
      true: {
        visibility: 'visible'
      }
    }
  }
});

type InputVariants = RecipeVariants<typeof input>;
export type InputSize = NonNullable<InputVariants>['size'];
