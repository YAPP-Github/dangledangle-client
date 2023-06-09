import { palette } from '@/styles/color';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { variants } from '../typography/Typography.css';

export const ButtonWrapper = recipe({
  base: {
    width: '100%',
    height: '48px',
    borderRadius: '8px',
    color: palette.white,
    boxSizing: 'border-box',
    textAlign: 'center',
    display: ' inline-block',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
  },
  variants: {
    disabled: {
      true: {
        backgroundColor: palette.primary100,
        transitionDuration: '0.4s'
      },
      false: {
        backgroundColor: palette.primary300,
        transitionTimingFunction: 'ease-out',
        transitionDuration: '0.2s',
        ':active': {
          backgroundColor: palette.primary200 //추후 논의후 색깔 수정예정
        }
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
