import React, { HTMLAttributes } from 'react';
import * as style from './Button.css';
import clsx from 'clsx';
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  size?: style.ButtonSizeType;
}

function Button({
  size = 'middle',
  disabled = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx([style.ButtonWrapper({ disabled, size }), className])}
    >
      {children}
    </button>
  );
}

export default Button;
