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
      large: variants.h3,
      small: variants.body2
    }
  }
});

export const message = recipe({
  base: {
    marginTop: '8px',
    lineHeight: '16px',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px'
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

export const counter = style({
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px'
});

export const underbar = recipe({
  base: {
    position: 'absolute',
    width: '100%',
    borderBottom: `1px solid ${palette.gray200}`,
    bottom: '0px'
  },

  variants: {
    status: {
      active: {
        borderColor: palette.gray900
      },
      default: {
        borderColor: palette.gray300
      },
      error: { borderColor: palette.error }
    }
  }
});

export const inputSuffix = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '12px'
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
