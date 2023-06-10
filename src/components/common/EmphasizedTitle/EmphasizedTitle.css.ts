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

export const underBar = style({
  width: '100%',
  height: '10px',
  position: 'absolute',
  zIndex: -1,
  bottom: '2px',
  left: 0,
  backgroundColor: palette.primary200,
  transform: 'translateX(100%)',
  animation: `${underbarAnimation} 1s ease`,
  animationDelay: '0.3s',
  animationFillMode: 'forwards'
});
