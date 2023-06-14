import React, { HTMLAttributes } from 'react';
import * as style from './Button.css';
import clsx from 'clsx';
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  size?: style.ButtonSizeType;
  variant?: style.ButtonVariant;
}

function Button({
  size = 'middle',
  disabled = false,
  variant = 'filled',
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx([
        style.ButtonWrapper({ variant, disabled, size }),
        className
      ])}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
