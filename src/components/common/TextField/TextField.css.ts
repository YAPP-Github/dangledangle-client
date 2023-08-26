import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { palette } from '@/styles/color';
import { variants } from '../Typography/Typography.css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative'
});

export const label = style({
  display: 'block',
  marginBottom: '6px'
});

export const textFieldContainer = style({
  height: '30px',
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  boxSizing: 'border-box'
});

export const textInput = recipe({
  base: {
    width: '100%',
    height: '100%',
    '::placeholder': {
      color: palette.gray300
    }
  },

  variants: {
    size: {
      large: variants.h3,
      small: variants.body2
    }
  }
});

export const textFieldUnderbar = recipe({
  base: {
    position: 'absolute',
    width: '100%',
    borderBottom: `1px solid ${palette.gray200}`,
    bottom: '0px'
  },

  variants: {
    status: {
      active: {
        borderColor: palette.gray300
      },
      default: {
        borderColor: palette.gray300,
        selectors: {
          [`${textInput()}:active ~ & ,${textInput()}:focus ~ &`]: {
            borderBottom: `1px solid ${palette.gray900}`
          }
        }
      },
      error: { borderColor: palette.error }
    }
  }
});

export const textAreaContainer = recipe({
  base: {
    overflowY: 'scroll',
    height: '100%',
    width: '100%',
    border: '1px solid',
    borderRadius: '5px',
    boxSizing: 'border-box',
    padding: '10px',
    marginBottom: '4px',
    overflowX: 'hidden' /* 가로 스크롤은 숨김 */,
    whiteSpace: 'pre-wrap' /* 줄 바꿈과 공백 유지 */,
    wordWrap: 'break-word'
  },
  variants: {
    status: {
      active: {
        borderColor: palette.gray900
      },
      default: {
        borderColor: palette.gray300,
        selectors: {
          [`${textInput()}:active ~ & ,${textInput()}:focus ~ &`]: {
            border: `1px solid ${palette.gray900}`
          }
        }
      },
      error: { borderColor: palette.error }
    }
  }
});

export const textFieldSuffix = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '12px'
  },
  variants: {
    status: {
      active: {
        color: palette.gray900
      },
      default: {
        color: palette.gray300,
        selectors: {
          [`${textInput()}:active ~ & , ${textInput()}:focus ~ &`]: {
            color: palette.gray900
          }
        }
      },
      error: { color: palette.error }
    }
  }
});

export const textAreaSuffix = recipe({
  base: {
    marginTop: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  variants: {
    status: {
      active: {
        color: palette.gray900
      },
      default: {
        color: palette.gray300,
        selectors: {
          [`${textInput()}:active ~ & , ${textInput()}:focus ~ &`]: {
            color: palette.gray900
          }
        }
      },
      error: { color: palette.error }
    }
  }
});

type TextInputVariants = RecipeVariants<typeof textInput>;
export type InputSize = NonNullable<TextInputVariants>['size'];
