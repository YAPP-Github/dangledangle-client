import { palette } from '@/styles/color';
import { BREAK_POINT, GLOBAL_PADDING_X } from '@/styles/global.css';
import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { HEADER_HEIGHT } from '../Header/Header.css';

export const tabColor = createVar('tabColor');
export const tabX = createVar('tabX');
export const TAB_HEIGHT = 40;

export const tabList = style({
  width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
  maxWidth: BREAK_POINT,
  transform: `translateX(-${GLOBAL_PADDING_X}px)`,
  display: 'flex',
  justifyContent: 'space-between',
  background: tabColor,
  cursor: 'pointer',
  borderBottom: `1px solid ${palette.gray100}`
});

export const sticky = style({
  position: 'sticky',
  top: HEADER_HEIGHT,
  zIndex: 1
});

export const tabBox = style({
  flex: 1,
  height: TAB_HEIGHT,
  textAlign: 'center',
  position: 'relative'
});

export const tabText = style({
  paddingTop: 7,
  paddingBottom: 9
});

export const panel = recipe({
  base: {},
  variants: {
    visible: {
      true: { display: 'block' },
      false: { display: 'none' }
    },
    size: {
      fullWidth: {
        width: `calc(100% + 2 * ${GLOBAL_PADDING_X}px)`,
        maxWidth: BREAK_POINT,
        transform: `translateX(-${GLOBAL_PADDING_X}px)`
      },
      nomal: { width: '100%' }
    }
  }
});

export const selectedLine = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '33.33%',
  height: '2px',
  backgroundColor: palette.gray900,
  zIndex: 1,
  transition: 'transform 0.3s ease',
  willChange: 'transform',
  transform: `translateX(${tabX}) translateY(1px)`
});
