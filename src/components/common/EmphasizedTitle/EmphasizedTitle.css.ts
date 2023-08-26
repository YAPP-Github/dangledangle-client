import { palette } from '@/styles/color';
import { keyframes, style } from '@vanilla-extract/css';
const underbarAnimation = keyframes({
  from: {
    transform: 'translateX(100%)'
  },
  to: {
    transform: 'translateX(0%)'
  }
});

export const wrapper = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'baseline'
});
export const singleLine = style({
  selectors: {
    [`${wrapper} > &`]: {
      display: 'inline-block'
    }
  }
});

export const underBarContainer = style({
  display: 'inline',
  position: 'relative',
  overflow: 'hidden'
});

export const underBarText = style({
  zIndex: 10,
  position: 'relative'
});

export const underBar = style({
  width: '100%',
  height: '10px',
  position: 'absolute',
  bottom: '2px',
  zIndex: 1,
  left: 0,
  backgroundColor: palette.primary300,
  transform: 'translateX(100%)',
  animation: `${underbarAnimation} 1s ease`,
  animationDelay: '0.3s',
  animationFillMode: 'forwards'
});
