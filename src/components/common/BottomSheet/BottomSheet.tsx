import React from 'react';
import * as styles from './BottomSheet.css';
import { AnimatePresence, motion } from 'framer-motion';
import * as m from '../CofirmDialog/utils/motion';
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
  children
}: BottomSheetProps) {
  const handleOverlayClick = () => {
    onClose && onClose();
  };

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
