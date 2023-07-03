import { Color, palette } from '@/styles/color';
import * as styles from './Typography.css';
import clsx from 'clsx';
import React, { ElementType } from 'react';

export interface TypographyProps
  extends React.PropsWithChildren,
    React.HTMLProps<
      HTMLAnchorElement &
        HTMLParagraphElement &
        HTMLLabelElement &
        HTMLHeadingElement &
        HTMLSpanElement
    > {
  color?: Color;
  element?: ElementType;
}

export function withTypographyBase(element: string, variant: styles.Variant) {
  function Typography({
    className,
    children,
    color,
    style,
    element: elementProps,
    ...props
  }: TypographyProps) {
    const TypographyEl = React.createElement(
      elementProps || element,
      {
        className: clsx(styles.variants[variant], className),
        style: {
          ...style,
          ...(color && { color: palette[color] })
        },
        ...props
      },
      children
    );
    return TypographyEl;
  }
  return Typography;
}
