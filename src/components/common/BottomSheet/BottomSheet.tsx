import React, { useEffect, useState } from 'react';
import * as styles from './BottomSheet.css';
import { AnimatePresence, motion } from 'framer-motion';
import * as m from '../CofirmDialog/utils/motion';
import clsx from 'clsx';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { BREAK_POINT } from '@/styles/global.css';

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
  children
}: BottomSheetProps) {
  const handleOverlayClick = () => {
    onClose && onClose();
  };

  const [leftValue, setLeftValue] = useState(0);

  useEffect(() => {
    const updateLeftValue = () => {
      const innerWidth = window.innerWidth;
      const newLeftValue =
        innerWidth < 600 ? 0 : (innerWidth - BREAK_POINT) / 2;
      setLeftValue(newLeftValue);
    };

    updateLeftValue();

    window.addEventListener('resize', updateLeftValue);

    return () => {
      window.removeEventListener('resize', updateLeftValue);
    };
  }, [leftValue]);

  return (
    <AnimatePresence>
      {isOpened && (
        <>
          <motion.div
            className={styles.overlay}
            onClick={handleOverlayClick}
            variants={m.overlayVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
          />
          <motion.section
            className={clsx(className, styles.panel)}
            style={assignInlineVars({
              [styles.bottomSheetLeft]: `${leftValue}px`
            })}
            variants={m.bottomVariants}
            initial="initial"
            animate="visible"
            exit="leaving"
          >
            <div className={styles.childrenWrap}>{children}</div>
          </motion.section>
        </>
      )}
    </AnimatePresence>
  );
}
