import React from 'react';
import { button } from './ConfirmDialog.css';

interface ConfirmButtonProps {
  title: string;
  onClick?: () => void;
}
export default function ConfirmButton({ title, onClick }: ConfirmButtonProps) {
  const handleButtonClick = () => {
    onClick?.();
  };

  return (
    <button className={button} onClick={handleButtonClick}>
      {title}
    </button>
  );
}
