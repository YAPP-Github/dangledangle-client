import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const inputTypeRecipe = recipe({
  variants: {
    status: {
      default: 'default',
      active: 'active',
      error: 'error',
      success: 'green'
    }
  },
  compoundVariants: [
    {
      variants: { status: 'default' },
      style: {
        vars: {
          '--status-color': 'lightgray'
        }
      }
    },
    {
      variants: { status: 'active' },
      style: {
        vars: {
          '--status-color': 'black'
        }
      }
    },
    {
      variants: { status: 'error' },
      style: {
        vars: {
          '--status-color': 'red'
        }
      }
    },
    {
      variants: { status: 'success' },
      style: {
        vars: {
          '--status-color': 'green'
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
  color: 'grey'
});

export const inputContainer = style({
  position: 'relative',
  display: 'flex',
  boxSizing: 'border-box',
  alignItems: 'center',
  maxWidth: '400px',
  '::placeholder': {
    color: 'lightgrey'
  }
});

export const input = style({
  padding: '12px',
  width: '100%'
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
  color: 'var(--status-color)'
});
