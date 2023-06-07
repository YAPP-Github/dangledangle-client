import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { palette } from '@/styles/color';
import { variants } from '../common/typography/Typography.css';

export const inputTypeRecipe = recipe({
  variants: {
    status: {
      default: 'default',
      active: 'active',
      error: 'error',
      success: 'success'
    }
  },
  compoundVariants: [
    {
      variants: { status: 'default' },
      style: {
        vars: {
          '--status-color': palette.gray300
        }
      }
    },
    {
      variants: { status: 'active' },
      style: {
        vars: {
          '--status-color': palette.gray900
        }
      }
    },
    {
      variants: { status: 'error' },
      style: {
        vars: {
          '--status-color': palette.error
        }
      }
    },
    {
      variants: { status: 'success' },
      style: {
        vars: {
          '--status-color': palette.primary300
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
  color: palette.gray600
});

export const inputContainer = style({
  position: 'relative',
  maxWidth: '400px',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  marginBottom: '12px',
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
        margin: '6px 0px',
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
  bottom: '-1px',
  borderColor: 'var(--status-color)'
});

export const message = style({
  color: 'var(--status-color)'
});

export const count = style({
  marginLeft: '8px',
  color: 'var(--status-color)'
});
