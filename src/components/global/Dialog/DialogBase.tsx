import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React, { PropsWithChildren } from 'react';
import * as styles from './DialogBase.css';
import useResize from './hooks/useResize';
import * as m from './utils/motion';
import Portal from './Portal/Portal';

export interface DialogBaseProps extends PropsWithChildren {
  /** dialog status */
  open: boolean;
  /** dialog close function  */
  onClose: () => void;
}

export default function DialogBase({
  open = false,
  children,
  onClose
}: DialogBaseProps) {
  const { modalSize, modalRef } = useResize(open);

  return (
    <Portal portalId="modal">
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
                {children}
              </motion.article>
            </>
          )}
        </AnimatePresence>
      </section>
    </Portal>
  );
}
