import React, { HTMLAttributes, useMemo } from 'react';
import * as style from './Button.css';
import clsx from 'clsx';
import { PlusIcon } from '@/asset/icons';

type PrefixIcon = 'plus';
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  size?: style.ButtonSizeType;
  variant?: style.ButtonVariant;
  prefixIcon?: PrefixIcon;
}

function Button({
  size = 'middle',
  disabled = false,
  variant = 'filled',
  children,
  className,
  prefixIcon,
  ...rest
}: ButtonProps) {
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
      className={clsx([
        style.ButtonWrapper({ variant, disabled, size }),
        className
      ])}
      disabled={disabled}
    >
      {renderedIcon && <div className={style.prefixIcon}>{renderedIcon}</div>}
      {children}
    </button>
  );
}

export default Button;
