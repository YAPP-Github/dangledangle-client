import { style } from '@vanilla-extract/css';

export const panel = style({
  position: 'fixed',
  bottom: 0,
  left: 0,
  height: 500,
  borderRadius: '30px',
  width: '100%',
  backgroundColor: 'rgb(255, 255, 255)',
  boxShadow: `0px 0px 10px #888888`,
  transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  zIndex: 100,
  transform: 'translateY(100%)',
  visibility: 'hidden'
});

export const panelOpen = style({
  transform: 'translateY(100px)',
  visibility: 'visible'
});

export const overlay = style({
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 100
});

export const defaultContent = style({
  display: 'flex',
  justifyContent: 'left',

  padding: 30,
  paddingTop: 30,
  width: '100%',
  height: '100%',

  fontFamily: 'Pretendard',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '34px'
});
