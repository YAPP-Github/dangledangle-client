import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const container = style({
  position: 'relative',
  width: '100%',
  height: '100%',
  zIndex: 100,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

export const dialogOverlay = style({
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(60, 60, 60, 0.7)',
  backdropFilter: 'blur(5)'
});

export const modalConatainer = recipe({
  base: {
    boxSizing: 'border-box',
    position: 'fixed',
    top: '50%',
    left: '50%',
    borderRadius: '8px',
    padding: '20px',
    background: palette.white,
    width: '320px',
    maxHeight: 'calc(85vh)'
  },
  variants: {
    size: {
      sm: {
        transform: 'translate(-50%, -100%)'
      },
      lg: {
        transform: 'translate(-50%, -50%)'
      }
    }
  }
});
