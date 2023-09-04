import { FOOTER_HEIGHT } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const footerWrapper = recipe({
  base: {
    padding: '48px 20px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    rowGap: 12,
    height: FOOTER_HEIGHT
  },
  variants: {
    visible: {
      true: {
        opacity: 1
      },
      false: {
        opacity: 0
      }
    }
  }
});

export const linkWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: 10,
  opacity: 0.6,
  cursor: 'pointer'
});
export const logo = style({
  height: '16px'
});
