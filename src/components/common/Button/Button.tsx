import React, { HTMLAttributes, forwardRef, useMemo } from 'react';
import * as styles from './Button.css';
import clsx from 'clsx';
import { PlusIcon } from '@/asset/icons';
import { assignInlineVars } from '@vanilla-extract/dynamic';

type PrefixIcon = 'plus';
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  size?: styles.ButtonSizeType;
  variant?: styles.ButtonVariantType;
  buttonColor?: styles.ButtonColorType;
  prefixIcon?: PrefixIcon;
  width?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'middle',
      disabled = false,
      variant = 'filled',
      buttonColor = 'primary',
      children,
      className,
      prefixIcon,
      width = '100%',
      style,
      ...rest
    },
    ref
  ) => {
    const renderedIcon = useMemo(() => {
      switch (prefixIcon) {
        case 'plus':
          return <PlusIcon />;
        default:
          return undefined;
      }
    }, [prefixIcon]);

    return (
      <button
        {...rest}
        ref={ref}
        className={clsx([
          styles.ButtonWrapper({ variant, size, buttonColor }),
          className
        ])}
        style={{ ...assignInlineVars({ width }), ...style }}
        disabled={disabled}
      >
        {renderedIcon && (
          <div className={styles.prefixIcon}>{renderedIcon}</div>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
