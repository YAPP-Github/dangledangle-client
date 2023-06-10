import { createVar, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const marqueeDuration = createVar();

const marqueeAnimationStart = keyframes({
  from: {
    transform: 'translateX(-10vw)'
  },
  to: {
    transform: 'translateX(110vw)'
  }
});
const marqueeAnimationEnd = keyframes({
  from: {
    transform: 'translateX(-130vw)'
  },
  to: {
    transform: 'translateX(-10vw)'
  }
});

export const wrapper = style({
  position: 'relative'
});
export const marquee = recipe({
  base: {
    width: '120vw',
    position: 'absolute',
    display: 'inline',
    top: 0,
    left: 0,
    animationDelay: '0s',
    wordBreak: 'keep-all',
    overflow: 'hidden'
  },
  variants: {
    start: {
      1: {
        transform: 'translateX(-10vw)',
        animation: `${marqueeAnimationStart} ${marqueeDuration} linear infinite`
      },
      2: {
        transform: 'translateX(-120vw)',

        animation: `${marqueeAnimationEnd} ${marqueeDuration} linear infinite`
      }
    }
  }
});
