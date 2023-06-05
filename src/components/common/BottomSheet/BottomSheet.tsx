import React from 'react';
import { defaultContent, overlay, panel, panelOpen } from './BottomSheet.css';

interface BottomSheetProps {
  /** bottom sheet status */
  isOpened: boolean;
  /** bottom sheet close func */
  onClose?: () => void;
  /** bottom sheet 요소 */
  children?: React.ReactNode;
  /** bottom sheet 요소 */
  content?: React.ReactNode;
}

export default function BottomSheet({
  isOpened = false,
  onClose,
  children,
  content = <div className={defaultContent}>약관에 동의해주세요.</div>
}: BottomSheetProps) {
  const handleOverlayClick = () => {
    onClose && onClose();
  };

  return (
    <>
      {isOpened && <div className={overlay} onClick={handleOverlayClick} />}
      <section className={`${panel} ${isOpened ? panelOpen : ''}`}>
        {children || content}
      </section>
    </>
  );
}
