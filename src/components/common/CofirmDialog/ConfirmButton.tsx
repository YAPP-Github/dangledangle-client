import React from 'react';
import { button } from './ConfirmDialog.css';

interface ConfirmButtonProps {
  title: string;
  handleButton?: () => void;
}
export default function ConfirmButton({
  title,
  handleButton
}: ConfirmButtonProps) {
  return (
    <button className={button} onClick={handleButton}>
      {title}
    </button>
  );
}
