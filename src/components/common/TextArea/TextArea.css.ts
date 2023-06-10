import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { palette } from '@/styles/color';
import { variants } from '../Typography/Typography.css';

const statusColor = createVar();
export const textAreaHeight = createVar();

export const wrapper = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: textAreaHeight,
    maxHeight: '400px',
    width: '100%',
    overflowY: 'scroll'
  },
  variants: {
    status: {
      default: 'default',
      active: 'active',
      error: 'error',
      loading: 'loading',
      success: 'success'
    }
  },
  compoundVariants: [
    {
      variants: {},
      style: {
        vars: {
          [statusColor]: palette.gray300
        }
      }
    },
    {
      variants: { status: 'active' },
      style: {
        vars: {
          [statusColor]: palette.gray900
        }
      }
    },
    {
      variants: { status: 'error' },
      style: {
        vars: {
          [statusColor]: palette.error
        }
      }
    },
    {
      variants: { status: 'success' },
      style: {
        vars: {
          [statusColor]: palette.primary300
        }
      }
    }
  ]
});

export const label = style({
  color: palette.gray600,
  marginBottom: '6px'
});

export const messageCountContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
});

export const textarea = recipe({
  base: {
    overflowY: 'scroll',
    height: '100%',
    width: '100%',
    border: '1px solid',
    borderRadius: '8px',
    borderColor: statusColor,
    boxSizing: 'border-box',
    padding: '10px',
    marginBottom: '4px',
    overflowX: 'hidden' /* 가로 스크롤은 숨김 */,
    whiteSpace: 'pre-wrap' /* 줄 바꿈과 공백 유지 */,
    wordWrap: 'break-word'
  },
  variants: {
    size: {
      small: variants.body2,
      big: variants.h3
    }
  },

  compoundVariants: [
    {
      variants: {},
      style: {
        position: 'relative',
        width: '100%'
      }
    }
  ]
});

export const message = style({
  color: statusColor
});

export const count = style({
  marginLeft: 'auto',
  display: 'inline-block',
  color: statusColor
});
