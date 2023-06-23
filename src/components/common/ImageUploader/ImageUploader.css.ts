import { palette } from '@/styles/color';
import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

export const container = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '100%'
});

export const defaultCircle = recipe({
  base: {
    marginTop: 10,
    marginBottom: 10,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  variants: {
    variant: {
      circle: {
        width: '96px',
        height: '96px',
        borderRadius: '96px',
        background: palette.gray50,
        border: `1px solid ${palette.gray200}`
      },
      square: {
        width: '80px',
        height: '80px',
        background: palette.gray50,
        border: `1px solid ${palette.gray300}`,
        borderRadius: '8px'
      }
    }
  }
});

export const camera = recipe({
  base: {
    position: 'absolute',
    display: 'flex',
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center'
  },

  variants: {
    variant: {
      circle: {
        width: '24px',
        height: '24px',
        borderRadius: '24px',
        marginTop: '40px',
        left: 'calc(50% + 30px)',
        background: palette.gray900
      },
      square: {
        width: '80px',
        height: '80px',
        background: palette.gray50,
        boader: `10px solid ${palette.gray500}`,
        borderRadius: '8px'
      },
      none: {
        opacity: 0
      }
    }
  }
});

export const fileInput = style({
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none'
});

export const imageCircle = recipe({
  base: {
    display: 'block',
    position: 'relative',
    marginTop: 10,
    marginBottom: 10,
    margin: 'auto',
    objectFit: 'cover'
  },
  variants: {
    variant: {
      circle: {
        width: '96px',
        height: '96px',
        borderRadius: '96px'
      },
      square: {
        width: '80px',
        height: '80px',
        borderRadius: '8px'
      }
    }
  }
});

type ButtonVariants = RecipeVariants<typeof defaultCircle>;
export type ImageVariant = NonNullable<ButtonVariants>['variant'];
