import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const searchBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  height: '31px',
  borderBottom: `1px solid ${palette.gray200}`,
  cursor: 'pointer',
  marginBottom: '10px'
});
