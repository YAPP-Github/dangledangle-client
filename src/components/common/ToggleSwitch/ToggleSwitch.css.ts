import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer'
});

export const toggle = style({
  appearance: 'none',
  position: 'relative',
  border: `max(2px, 0.1em) solid ${palette.gray200}`,
  borderRadius: '1.25em',
  width: '2em',
  height: '1em',
  '::before': {
    content: '',
    position: 'absolute',
    left: 0,
    width: '1em',
    height: '1em',
    borderRadius: '50%',
    transform: 'scale(0.9)',
    backgroundColor: palette.gray300,
    transition: 'left 250ms linear'
  },
  ':checked': {
    backgroundColor: palette.primary300,
    borderColor: palette.primary300
  },
  ':focus-visible': {
    outlineOffset: 'max(2px, 0.1em)',
    outline: `max(2px, 0.1em) solid ${palette.primary300}`
  },

  selectors: {
    [`&:checked::before`]: {
      backgroundColor: palette.white,
      left: '1em'
    },
    [`&:enabled:hover`]: {
      boxShadow: `0 0 0 max(4px, 0.2em) ${palette.gray100}`
    }
  }
});
