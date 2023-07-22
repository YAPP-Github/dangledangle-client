import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './Avartar.css';
import { CSSProperties, PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface AvartarProps extends PropsWithChildren {
  size: '96' | '80' | '32';
  defaultImage: styles.DefaultImageVariant;
  shape: styles.ShapeVariant;
  imagePath?: string | null;
  className?: string;
  style?: CSSProperties;
}

const Avartar: React.FC<AvartarProps> = ({
  size,
  defaultImage,
  shape,
  imagePath,
  children,
  className,
  style
}) => {
  return (
    <div
      className={clsx(
        styles.avartar({
          defaultImage,
          shape
        }),
        className
      )}
      style={{
        ...assignInlineVars({
          [styles.size]: size + 'px'
        }),
        ...(imagePath && { backgroundImage: `url(${imagePath})` }),
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Avartar;
