import { palette } from '@/styles/color';
import { BREAK_POINT } from '@/styles/global.css';
import { createVar, keyframes, style } from '@vanilla-extract/css';

export const skeletonHeight = createVar('skeletonHeight');
export const skeletonWidth = createVar('skeletonWidth');

const loading = keyframes({
  from: {
    transform: 'translateX(0)'
  },
  to: {
    transform: 'translateX(100%)'
  }
});

export const wrapper = style({
  padding: '16px',
  background: palette.white,
  borderRadius: '8px',
  border: `1px solid ${palette.gray200}`,
  cursor: 'pointer',
  position: 'relative'
});
export const grid = style({
  display: 'flex',
  flexDirection: 'column',

  gap: '10px'
});
export const inlineGrid = style({
  display: 'flex',
  flexDirection: 'row',
  columnGap: '8px'
});
export const colGrid = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
});
export const box = style({
  width: skeletonWidth,
  height: skeletonHeight,
  borderRadius: '4px',
  backgroundColor: 'rgba(0, 0, 0, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: BREAK_POINT,
    height: '100%',
    background: `linear-gradient(to right, #f2f2f2, #ddd, #f2f2f2)`,
    animation: `${loading} 1s infinite linear`
  }
});
