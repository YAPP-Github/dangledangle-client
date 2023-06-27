import { recipe } from '@vanilla-extract/recipes';

export const icon = recipe({
  base: {
    height: '24px',
    visibility: 'hidden',
    cursor: 'pointer'
  },
  variants: {
    visible: {
      true: {
        visibility: 'visible'
      }
    }
  }
});
