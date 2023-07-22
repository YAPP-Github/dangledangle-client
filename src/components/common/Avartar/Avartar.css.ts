import { Clock, Dog } from '@/asset/icons';
import { palette } from '@/styles/color';
import { createVar } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

export const size = createVar('size');
export const avartar = recipe({
  base: {
    border: `1px solid ${palette.gray300}`,
    width: size,
    height: size,
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
        backgroundImage: `url(/images/DefaultAnimal.png)`,
        backgroundColor: palette.white
      },
      puppy: {
        backgroundImage: `url(/images/DefaultAnimal.png)`,
        backgroundColor: palette.gray200
      }
    }
  }
});

type AvartarVariants = RecipeVariants<typeof avartar>;
export type ShapeVariant = NonNullable<AvartarVariants>['shape'];
export type DefaultImageVariant = NonNullable<AvartarVariants>['defaultImage'];
