import { palette } from '@/styles/color';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const modalBgShow = keyframes({
  from: {
    opacity: '0'
  },
  to: {
    opacity: '1'
  }
});

export const modalShow = keyframes({
  from: {
    opacity: '0',
    marginTop: '-50px'
  },
  to: {
    opacity: '1',
    marginTop: '0'
  }
});

export const modalBgHide = keyframes({
  from: {
    opacity: '1'
  },
  to: {
    opacity: '0'
  }
});

export const modalHide = keyframes({
  from: {
    opacity: '1',
    marginTop: '0'
  },
  to: {
    opacity: '0',
    marginTop: '-50px'
  }
});

export const container = style({
  position: 'absolute',
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
    overflow: 'auto',
    top: '50%',
    left: '50%',
    borderRadius: '10px',
    padding: '1.5rem',
    background: 'white',
    width: '25rem',
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
  padding: 10,
  cursor: 'pointer'
});

export const childrenWarp = style({
  width: '100%',
  height: 'auto'
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  padding: 30
});

export const buttonWrapper = style({
  display: 'flex',
  gap: 10
});

export const button = style({
  width: '100%',
  height: '48px',
  cursor: 'pointer',
  background: palette.primary300,
  ':hover': {
    background: palette.primary200
  },
  borderRadius: '8px',
  border: '0px',
  color: palette.white,
  textAlign: 'center'
});
