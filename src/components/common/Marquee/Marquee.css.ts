import { createVar, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const marqueeDuration = createVar();

const marqueeAnimationStart = keyframes({
  from: {
    transform: 'translateX(-10%)'
  },
  to: {
    transform: 'translateX(110%)'
  }
});
const marqueeAnimationEnd = keyframes({
  from: {
    transform: 'translateX(-130%)'
  },
  to: {
    transform: 'translateX(-10%)'
  }
});

export const wrapper = style({
  position: 'relative',
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden'
});
export const marquee = recipe({
  base: {
    width: '120%',
    position: 'absolute',
    display: 'inline',
    animationDelay: '0s',
    wordBreak: 'keep-all',
    overflow: 'hidden',
    textAlign: 'center'
  },
  variants: {
    start: {
      1: {
        transform: 'translateX(-10%)',
        animation: `${marqueeAnimationStart} ${marqueeDuration} linear infinite`
      },
      2: {
        transform: 'translateX(-120%)',

        animation: `${marqueeAnimationEnd} ${marqueeDuration} linear infinite`
      }
    }
  }
});
