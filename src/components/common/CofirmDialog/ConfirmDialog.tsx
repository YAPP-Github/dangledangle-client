import { Close } from '@/asset/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { H3 } from '../Typography';
import * as styles from './ConfirmDialog.css';
import Portal from './Portal/Portal';
import useResize from './hooks/useResize';
import * as m from './utils/motion';

export interface ConfirmDialogProps {
  /** dialog status */
  open: boolean;
  /** dialog close function  */
  onClose: () => void;
  /** dialog 요소 */
  children?: React.ReactNode;
}

export default function ConfirmDialog({
  open = false,
  onClose,
  children
}: ConfirmDialogProps) {
  const { modalSize, modalRef } = useResize(open);

  return (
    <Portal>
      <section className={styles.container}>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className={styles.dialogOverlay}
                onClick={onClose}
                variants={m.overlayVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
              />
              <motion.article
                className={clsx(styles.modalConatainer({ size: modalSize }))}
                ref={modalRef}
                variants={m.boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
              >
                <header className={styles.header}>
                  <Close className={styles.closeIcon} onClick={onClose} />
                </header>
                <main className={styles.contents}>
                  <div className={styles.childrenWarp}>{children}</div>
                </main>
              </motion.article>
            </>
          )}
        </AnimatePresence>
      </section>
    </Portal>
  );
}
