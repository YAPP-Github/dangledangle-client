import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  columnGap: '22px'
});

export const radioWrapper = style({
  display: 'flex',
  alignItems: 'center'
});

export const label = style({
  marginLeft: '6px'
});

export const radio = style({
  boxSizing: 'border-box',
  width: '20px',
  height: '20px',
  borderRadius: '100%',
  border: `1.5px solid ${palette.gray300}`,

  ':checked': {
    border: `6px solid ${palette.primary300}`
  }
});
