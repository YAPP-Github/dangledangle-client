import React, { HTMLAttributes, forwardRef, useMemo } from 'react';
import * as styles from './Button.css';
import clsx from 'clsx';
import { PlusIcon } from '@/asset/icons';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import LoadingIndicator from './LoadingIndicator';

type PrefixIcon = 'plus';
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  size?: styles.ButtonSizeType;
  variant?: styles.ButtonVariant;
  prefixIcon?: PrefixIcon;
  width?: string;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = 'middle',
      disabled = false,
      variant = 'filled',
      children,
      className,
      prefixIcon,
      width = '100%',
      style,
      loading,
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
          styles.ButtonWrapper({ variant, disabled, size }),
          className
        ])}
        style={{ ...assignInlineVars({ width }), ...style }}
        disabled={disabled}
      >
        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {renderedIcon && (
              <div className={styles.prefixIcon}>{renderedIcon}</div>
            )}
            {children}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
