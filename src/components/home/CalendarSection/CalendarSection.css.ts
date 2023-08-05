import { HEADER_HEIGHT } from '@/components/common/Header/Header.css';
import { palette } from '@/styles/color';
import { expandGlobalPadding } from '@/styles/global.css';
import { style } from '@vanilla-extract/css';

export const FILTER_HEIGHT = 47.5;

export const expandWhiteContainer = style([
  expandGlobalPadding,
  {
    background: palette.white
  }
]);

export const sticky = style({
  position: 'sticky',
  top: HEADER_HEIGHT,
  zIndex: 10
});
export const filterContainer = style([
  expandWhiteContainer,
  {
    display: 'flex',
    columnGap: 8,
    flexWrap: 'nowrap',
    overflowX: 'scroll',
    alignItems: 'center',
    '::-webkit-scrollbar': {
      display: 'none'
    },
    paddingTop: 10,
    paddingBottom: 4
  }
]);

export const title = style([
  expandWhiteContainer,
  {
    paddingBottom: 6,
    paddingTop: 32
  }
]);

export const empty = style({
  padding: '54px 0',
  textAlign: 'center'
});

export const dummyItem = style({
  background: 'black',
  marginBottom: 12,
  width: '100%',
  height: 200
});
