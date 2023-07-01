import { palette } from '@/styles/color';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { variants } from '../Typography/Typography.css';
import { createVar, style } from '@vanilla-extract/css';

const width = createVar('width');
const buttonColor = createVar('button_background_color');
const activeColor = createVar('button_active_color');
const disabledBackgroundColor = createVar('button_disabled_background_color');

export const ButtonWrapper = recipe({
  base: {
    width,
    height: '48px',
    borderRadius: '8px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transitionTimingFunction: 'ease-out',
    transitionDuration: '0.2s',
    cursor: 'pointer',
    color: palette.white,
    selectors: {
      '&:disabled': {
        transitionDuration: '0.4s',
        cursor: 'not-allowed'
      }
    }
  },
  variants: {
    variant: {
      filled: {
        backgroundColor: buttonColor,
        selectors: {
          '&:hover, &:active': {
            backgroundColor: activeColor
          },
          '&:disabled': {
            backgroundColor: disabledBackgroundColor
          }
        }
      },
      line: {
        border: `solid 1px ${palette.gray300}`,
        backgroundColor: palette.gray50,
        color: palette.gray600,
        selectors: {
          '&:hover, &:active': {
            border: `solid 1px ${activeColor}`,
            color: activeColor
          },
          '&:disabled': {
            border: palette.gray300,
            color: palette.gray300
          }
        }
      }
    },

    buttonColor: {
      primary: {
        vars: {
          [buttonColor]: palette.primary300,
          [activeColor]: palette.primary400,
          [disabledBackgroundColor]: palette.primary100
        }
      },
      secondary: {
        vars: {
          [buttonColor]: palette.gray800,
          [activeColor]: palette.gray900,
          [disabledBackgroundColor]: palette.gray400
        }
      }
    },
    size: {
      // 추후 사이즈 variants 추가 여부에 따라서 변경
      xsmall: [
        variants.caption1,
        {
          height: '34px',
          borderRadius: '4px'
        }
      ],
      small: [
        variants.button1,
        {
          height: '40px',
          borderRadius: '4px'
        }
      ],
      middle: variants.h4,
      large: variants.h4
    }
  },
  compoundVariants: [
    {
      variants: {
        variant: 'line',
        size: 'middle'
      },
      style: variants.button2
    }
  ]
});

export const prefixIcon = style({
  width: '20px',
  height: '20px',
  marginRight: '8px',
  borderRadius: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: palette.gray500,
  transitionTimingFunction: 'ease-out',
  transitionDuration: '0.2s',
  selectors: {
    [`button:hover &`]: {
      backgroundColor: palette.primary300
    }
  }
});

type ButtonVariants = RecipeVariants<typeof ButtonWrapper>;
export type ButtonSizeType = NonNullable<ButtonVariants>['size'];
export type ButtonVariantType = NonNullable<ButtonVariants>['variant'];
export type ButtonColorType = NonNullable<ButtonVariants>['buttonColor'];
