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

export const header = style({
  position: 'absolute',
  right: '0.5rem',
  top: '0.5rem',
  margin: 10,
  cursor: 'pointer',
  zIndex: 1
});

export const childrenWarp = style({
  width: '100%',
  height: 'auto',
  padding: '10px'
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  paddingTop: '32px',
  paddingBottom: '12px'
});

export const buttonWrapper = style({
  display: 'flex',
  gap: 10
});
