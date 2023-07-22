import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './Avartar.css';
import { CSSProperties, PropsWithChildren } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

export interface AvartarProps extends PropsWithChildren {
  size: '96' | '80' | '32';
  defaultImage: styles.DefaultImageVariant;
  shape: styles.ShapeVariant;
  alt?: string;
  imagePath?: string | null;
  className?: string;
  style?: CSSProperties;
}

const DefaultAvarta: React.FC<AvartarProps> = ({
  size,
  defaultImage,
  shape,
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
        ...style
      }}
    >
      {children}
    </div>
  );
};

const ImageAvartar: React.FC<AvartarProps & { imagePath: string }> = ({
  size,
  shape,
  imagePath,
  children,
  className,
  alt = '',
  style
}) => {
  return (
    <Image
      width={size}
      height={size}
      className={clsx(
        styles.avartar({
          shape
        }),
        className
      )}
      style={{
        ...style
      }}
      src={imagePath}
      alt={alt}
    >
      {children}
    </Image>
  );
};

const Avartar: React.FC<AvartarProps> = ({ children, imagePath, ...props }) => {
  return typeof imagePath === 'string' && imagePath !== '' ? (
    <ImageAvartar {...props} imagePath={imagePath}></ImageAvartar>
  ) : (
    <DefaultAvarta {...props}>{children}</DefaultAvarta>
  );
};

export default Avartar;
