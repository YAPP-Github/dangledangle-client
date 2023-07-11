import { HEADER_HEIGHT } from '@/components/common/Header/Header.css';
import { TAB_HEIGHT } from '@/components/common/Tab/Tab.css';
import { style } from '@vanilla-extract/css';

export const tab = style({});

export const calendar = style({
  position: 'sticky',
  top: TAB_HEIGHT + HEADER_HEIGHT,
  zIndex: 1
});

export const list = style({});
