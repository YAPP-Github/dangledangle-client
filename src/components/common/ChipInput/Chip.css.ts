import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const base = style({
  borderRadius: 50,
  border: `1px solid ${palette.gray300}`,
  padding: '8px 16px',
  cursor: 'pointer',
  width: 'fit-content'
});

export const checked = style([
  base,
  {
    backgroundColor: palette.gray700,
    borderColor: palette.gray700
  }
]);
