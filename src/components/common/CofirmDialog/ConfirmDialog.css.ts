import { keyframes, style } from '@vanilla-extract/css';

export const modalBgShow = keyframes({
  from: {
    opacity: '0'
  },
  to: {
    opacity: '1'
  }
});

export const modalShow = keyframes({
  from: {
    opacity: '0',
    marginTop: '-50px'
  },
  to: {
    opacity: '1',
    marginTop: '0'
  }
});

export const modalBgHide = keyframes({
  from: {
    opacity: '1'
  },
  to: {
    opacity: '0'
  }
});

export const modalHide = keyframes({
  from: {
    opacity: '1',
    marginTop: '0'
  },
  to: {
    opacity: '0',
    marginTop: '-50px'
  }
});

export const container = style({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 100,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

export const dialogOverlay = style({
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(60, 60, 60, 0.7)',
  backdropFilter: 'blur(5)'
});

export const modalBlock = style({
  position: 'absolute',
  top: '10rem',
  borderRadius: '10px',
  padding: '1.5rem',
  background: 'white',
  width: '30rem',
  minHeight: '15rem'
});

export const close = style({
  position: 'absolute',
  right: '1.5rem',
  top: '1.5rem',
  cursor: 'pointer'
});

export const contents = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px'
});

export const typograpy = style({
  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '22px',
  lineHeight: '22px',
  margin: 'auto',
  textAlign: 'center',
  padding: 10
});

export const buttonWrapper = style({
  display: 'flex',
  gap: 10
});

export const button = style({
  width: '100%',
  height: '48px',
  cursor: 'pointer',

  /* Primary/300 */
  background: '#15D3CF',
  ':hover': {
    background: '#9DF5F3'
  },
  borderRadius: '8px',
  border: '0px',
  color: '#FFFFFF'
});
