import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
  minHeight: '232px',
  maxHeight: '600px',
  backgroundImage: 'url(/images/banner.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center right',
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 0',
  boxSizing: 'border-box',
  rowGap: '10px'
});

export const titleWrapper = style({
  color: palette.gray900,
  fontWeight: 600,
  fontSize: '1.25rem',
  lineHeight: '1.75rem'
});

export const infoLink = style({
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center'
});

export const myShelterHomeButton = style({
  position: 'absolute',
  bottom: '32px',
  padding: '8px 16px',
  borderRadius: '50px',
  boxSizing: 'border-box',
  backgroundColor: palette.gray700,
  cursor: 'pointer'
});
