import { palette } from '@/styles/color';
import { style, styleVariants } from '@vanilla-extract/css';

export const badgeColor = styleVariants({
  primary: { color: palette.primary300, backgroundColor: palette.primary100 },
  gray: { color: palette.gray400, backgroundColor: palette.gray200 }
});

export const badge = style({
  width: 'fit-content',
  padding: '2px 4px',
  borderRadius: '4px'
});
