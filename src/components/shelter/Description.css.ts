import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = style({
  margin: '16px 0px'
});
export const description = recipe({
  base: {
    color: palette.gray600,
    display: 'inline',
    verticalAlign: 'bottom'
  },
  variants: {
    expanded: {
      true: {
        height: '100%'
      },
      false: {
        height: 44,
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }
  }
});
export const moreButton = style({
  display: 'inline',
  marginLeft: 8,
  textAlign: 'right'
});
