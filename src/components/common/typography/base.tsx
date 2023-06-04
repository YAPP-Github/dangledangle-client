import { Color, palette } from '@/styles/color';
import * as styles from './Typography.css';
import classNames from 'classnames';

export interface TypographyProps
  extends React.PropsWithChildren,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    > {
  color?: Color;
}

export function withTypographyBase(
  WrappedTypography: any,
  variant: styles.Variant
) {
  function Typography({
    className,
    children,
    color,
    style,
    ...props
  }: TypographyProps) {
    const textColor = color ? palette[color] : styles.defaultColor;

    return (
      <WrappedTypography
        className={classNames(styles.variants[variant], className)}
        style={{
          ...style,
          color: textColor
        }}
        {...props}
      >
        {children}
      </WrappedTypography>
    );
  }
  return Typography;
}
