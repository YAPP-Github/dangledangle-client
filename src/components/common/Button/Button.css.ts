import { palette } from '@/styles/color';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { variants } from '../Typography/Typography.css';

export const ButtonWrapper = recipe({
  base: {
    width: '100%',
    height: '48px',
    borderRadius: '8px',
    boxSizing: 'border-box',
    textAlign: 'center',
    display: ' inline-block',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
  },
  variants: {
    variant: {
      filled: {
        backgroundColor: palette.primary300,
        color: palette.white,
        transitionTimingFunction: 'ease-out',
        transitionDuration: '0.2s',

        '&:hover, &:active': {
          backgroundColor: palette.primary200 //추후 논의후 색깔 수정예정
        },
        '&:disabled': {
          backgroundColor: palette.primary100
        }
      },
      line: {
        border: `solid 1px ${palette.gray300}`,
        backgroundColor: palette.gray50,
        color: palette.gray600,

        '&:hover, &:active': {
          border: `solid 1px ${palette.primary300}`,
          color: palette.primary300
        },
        '&:disabled': {
          border: 'inherit',
          color: 'inherit'
        }
      }
    },
    disabled: {
      true: {
        transitionDuration: '0.4s',
        cursor: 'not-allowed'
      }
    },
    size: {
      // 추후 사이즈 variants 추가 여부에 따라서 변경
      small: variants.h4,
      middle: variants.h4,
      large: variants.h4
    }
  }
});

type ButtonVariants = RecipeVariants<typeof ButtonWrapper>;
export type ButtonSizeType = NonNullable<ButtonVariants>['size'];
export type ButtonVariant = NonNullable<ButtonVariants>['variant'];
