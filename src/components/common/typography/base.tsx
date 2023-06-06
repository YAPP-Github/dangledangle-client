import { Color, palette } from '@/styles/color';
import * as styles from './Typography.css';
import clsx from 'clsx';
import React from 'react';

export interface TypographyProps
  extends React.PropsWithChildren,
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    > {
  color?: Color;
}

export function withTypographyBase(element: string, variant: styles.Variant) {
  function Typography({
    className,
    children,
    color,
    style,
    ...props
  }: TypographyProps) {
    const textColor = color ? palette[color] : styles.defaultColor;
    return React.createElement(
      element,
      {
        className: clsx(styles.variants[variant], className),
        style: {
          ...style,
          color: textColor
        }
      },
      children
    );
  }
  return Typography;
}
