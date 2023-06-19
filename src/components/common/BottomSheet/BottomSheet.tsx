import React from 'react';
import { defaultContent, overlay, panel, panelOpen } from './BottomSheet.css';
import clsx from 'clsx';

interface BottomSheetProps {
  /** bottom sheet status */
  isOpened: boolean;
  /** bottom sheet close func */
  onClose?: () => void;

  className?: string;
  /** bottom sheet 요소 */
  children?: React.ReactNode;
}

export default function BottomSheet({
  isOpened = false,
  onClose,
  className,
  children = <div className={defaultContent}>약관에 동의해주세요.</div>
}: BottomSheetProps) {
  const handleOverlayClick = () => {
    onClose && onClose();
  };

  return (
    <>
      {isOpened && <div className={overlay} onClick={handleOverlayClick} />}
      <section
        className={clsx([className, `${panel} ${isOpened ? panelOpen : ''}`])}
      >
        {children}
      </section>
    </>
  );
}
