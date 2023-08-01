import { HEADER_HEIGHT } from '@/components/common/Header/Header.css';
import { FOOTER_HEIGHT } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  height: `calc(100vh - ${FOOTER_HEIGHT}px - ${HEADER_HEIGHT}px)`,
  position: 'relative',
  boxSizing: 'border-box',
  paddingTop: '40px'
});

export const top = style({});
export const articleWrapper = style({
  marginTop: '80px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px'
});

export const articleTitle = style({
  display: 'flex',
  alignItems: 'cneter'
});
export const content = style({
  padding: '16px',
  boxSizing: 'border-box',
  width: '100%',
  background: '#F8F8F8',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
});
export const ul = style({
  paddingLeft: '24px'
});
export const li = style({
  listStyle: 'outside'
});

export const bottom = style({
  position: 'absolute',
  bottom: '0',
  width: '100%',
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  gap: '24px'
});
