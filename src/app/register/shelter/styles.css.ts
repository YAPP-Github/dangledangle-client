import { HEADER_HEIGHT } from '@/components/common/Header/Header.css';
import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';

export const titleWrapper = style({
  paddingTop: '40px'
});
export const bottomSheetTxt = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});
export const subWrapper = style({
  display: 'flex',
  columnGap: '10px',
  marginBottom: '9px'
});
export const content = style({
  width: '100%',
  background: '#F8F8F8',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
});
export const check = style({
  display: 'flex',
  justifyContent: 'center'
});

export const post = style({
  height: '390px',
  overflowY: 'hidden'
});

export const carouselBtnWrap = style({
  display: 'flex',
  justifyContent: 'center'
});
export const carouselBtnText = style({
  marginTop: '16px',
  cursor: 'pointer'
});

export const bottomContent = style({
  padding: '20px'
});

export const divider = style({
  width: '100%',
  height: '1px',
  backgroundColor: palette.gray300,
  marginTop: '32px',
  marginBottom: '32px'
});
export const allCheck = style({
  display: 'flex',
  marginTop: '32px',
  columnGap: '8px'
});
export const checkBox = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
});

export const complete = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: `calc(208px - ${HEADER_HEIGHT}px)`
});
export const finish = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: `calc(110px - ${HEADER_HEIGHT}px)`
});
