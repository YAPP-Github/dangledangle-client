import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { palette } from '@/styles/color';
import { variants } from '../Typography/Typography.css';

const statusColor = createVar();

export const inputTypeRecipe = recipe({
  base: {
    vars: { statusColor }
  },
  variants: {
    status: {
      default: 'default',
      active: 'active',
      error: 'error',
      loading: 'loading',
      success: 'success'
    }
  },
  compoundVariants: [
    {
      variants: {},
      style: {
        vars: {
          [statusColor]: palette.gray300
        }
      }
    },
    {
      variants: { status: 'active' },
      style: {
        vars: {
          [statusColor]: palette.gray900
        }
      }
    },
    {
      variants: { status: 'error' },
      style: {
        vars: {
          [statusColor]: palette.error
        }
      }
    },
    {
      variants: { status: 'success' },
      style: {
        vars: {
          [statusColor]: palette.primary300
        }
      }
    }
  ]
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative'
});

export const label = style({
  color: palette.gray600,
  marginBottom: '6px'
});

export const inputContainer = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  paddingBottom: '6px',
  boxSizing: 'border-box',
  marginBottom: '8px',
  '::placeholder': {
    color: palette.gray200
  }
});

export const input = recipe({
  variants: {
    size: {
      big: variants.h3,
      small: variants.body2
    }
  },

  compoundVariants: [
    {
      variants: {},
      style: {
        position: 'relative',
        width: '100%'
      }
    }
  ]
});

export const underbar = style({
  position: 'absolute',
  width: `100%`,
  height: '1px',
  borderBottom: '1px solid black',
  bottom: '0px',
  borderColor: statusColor
});

export const icon = recipe({
  base: {
    height: '24px',
    visibility: 'hidden'
  },
  variants: {
    visible: {
      true: {
        visibility: 'visible'
      },
      false: {
        visibility: 'hidden'
      }
    }
  }
});

export const message = style({
  color: statusColor
});

export const count = style({
  marginLeft: '12px',
  display: 'inline-block',
  color: statusColor
});
