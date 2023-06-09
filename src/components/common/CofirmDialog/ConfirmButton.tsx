import React, { ButtonHTMLAttributes } from 'react';
import { button } from './ConfirmDialog.css';

interface ConfirmButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  onClick?: () => void;
}
export default function ConfirmButton({
  children,
  onClick,
  ...props
}: ConfirmButtonProps) {
  return (
    <button className={button} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
