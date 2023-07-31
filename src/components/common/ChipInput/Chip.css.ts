import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const base = style({
  borderRadius: 50,
  border: `1px solid ${palette.gray300}`,
  padding: '6px 12px',
  cursor: 'pointer',
  width: 'fit-content',
  whiteSpace: 'nowrap'
});

export const checked = style([
  base,
  {
    backgroundColor: palette.gray700,
    borderColor: palette.gray700
  }
]);
