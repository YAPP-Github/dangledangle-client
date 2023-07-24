import { palette } from '@/styles/color';
import { createVar } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

export const size = createVar('size');
export const avartar = recipe({
  base: {
    border: `1px solid ${palette.gray300}`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  },
  variants: {
    shape: {
      circle: {
        borderRadius: '100%'
      },
      square: {
        borderRadius: '8px'
      }
    },
    defaultImage: {
      shelter: {
        backgroundImage: `url(/images/Shelter.png)`,
        backgroundColor: palette.white,
        width: size,
        height: size
      },
      puppy: {
        backgroundImage: `url(/images/Puppy.png)`,
        backgroundColor: palette.gray200,
        width: size,
        height: size
      }
    }
  }
});

type AvartarVariants = RecipeVariants<typeof avartar>;
export type ShapeVariant = NonNullable<AvartarVariants>['shape'];
export type DefaultImageVariant = NonNullable<AvartarVariants>['defaultImage'];
