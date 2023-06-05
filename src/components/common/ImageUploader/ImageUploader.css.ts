import { style } from '@vanilla-extract/css';

export const defaultCircle = style({
  position: 'relative',
  width: '96px',
  height: '96px',
  margin: 10,
  borderRadius: '96px',
  left: 'calc(50% - 96px/2)',

  /* gray/200 */
  background: '#EDEDED'
});

export const camera = style({
  position: 'absolute',
  width: '24px',
  height: '24px',
  left: 'calc(50% + 24px)',
  marginTop: '-30px',
  border: 'none',
  borderRadius: '24px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  /* gray/900 */
  background: '#222222'
});

export const fileInput = style({
  opacity: 0,
  position: 'absolute'
});

export const imageCircle = style({
  position: 'relative',
  margin: 10,
  width: '96px',
  height: '96px',
  borderRadius: '96px',
  left: 'calc(50% - 96px/2)',
  objectFit: 'cover'
});
