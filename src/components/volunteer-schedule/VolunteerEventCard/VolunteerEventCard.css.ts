import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = recipe({
  base: {
    padding: '16px',
    background: palette.white,
    borderRadius: '8px',
    border: `1px solid ${palette.gray200}`,
    cursor: 'pointer'
  },
  variants: {
    status: {
      done: {
        opacity: 0.7
      },
      process: {
        opacity: 1
      }
    }
  }
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
});

export const badgeWrapper = style({
  display: 'flex',
  columnGap: '8px'
});

export const textClamp = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1,
  overflow: 'hidden',
  width: '100%'
});

export const infoContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
});

export const infoWrapper = style({
  display: 'flex',
  alignItems: 'center',
  columnGap: '6px'
});

export const statusWrapper = style({
  display: 'flex',
  alignItems: 'flex-end'
});

export const myStatus = style({
  textAlign: 'right',
  flexGrow: 1,
  marginTop: 4
});

export const shelterInfo = style({
  display: 'flex',
  marginTop: 10,
  columnGap: 4
});
