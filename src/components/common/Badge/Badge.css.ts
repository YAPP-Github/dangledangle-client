import { palette } from '@/styles/color';
import { style, styleVariants } from '@vanilla-extract/css';

export const badgeColor = styleVariants({
  primary: { color: palette.primary300, backgroundColor: palette.primary50 },
  gray: { color: palette.gray500, backgroundColor: palette.gray200 },
  success: { color: palette.success, backgroundColor: palette.success50 },
  line: {
    color: palette.gray600,
    backgroundColor: palette.white
  }
});

export const badge = style({
  width: 'fit-content',
  padding: '2px 6px',
  borderRadius: '4px'
});

export const badgeBoarder = style({
  border: `1px solid ${palette.gray200}`
});
