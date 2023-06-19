import { Close } from '@/asset/icons';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { H3 } from '../Typography';
import * as styles from './ConfirmDialog.css';
import Portal from './Portal/Portal';
import useResize from './hooks/useResize';
import * as m from './utils/motion';
import { Color } from '@/styles/color';
import Button from '../Button/Button';
import { ButtonVariant } from '../Button/Button.css';

interface ActionButtonProps {
  color?: Color;
  text?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
}
export interface BasicDialogProps {
  /** dialog status */
  open: boolean;
  /** dialog close function  */
  onClose: () => void;
  message?: string;
  /** dialog 버튼  */
  confirm?: ActionButtonProps;
  close?: ActionButtonProps;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  color,
  text,
  onClick
}) => {
  return (
    <Button variant={variant} color={color} onClick={onClick} size="small">
      {text}
    </Button>
  );
};

export default function BasicDialog({
  open = false,
  message,
  confirm,
  close,
  onClose
}: BasicDialogProps) {
  const { modalSize, modalRef } = useResize(open);
  const defaultClose: ActionButtonProps = {
    text: '취소',
    variant: 'line',
    onClick: onClose
  };
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
                className={clsx(
                  styles.modalConatainer({ size: modalSize, variant: 'basic' })
                )}
                ref={modalRef}
                variants={m.boxVariants}
                initial="initial"
                animate="visible"
                exit="leaving"
              >
                <header className={styles.header}>
                  <Close onClick={onClose} />
                </header>

                <main
                  className={styles.contents}
                  style={{ paddingBottom: '40px' }}
                >
                  <div>
                    {message?.split('<br/>').map((value, index) => {
                      return (
                        <H3 key={index} style={{ textAlign: 'center' }}>
                          {value}
                          <br />
                        </H3>
                      );
                    })}
                  </div>
                </main>
                <footer className={styles.buttonWrapper}>
                  {close && <ActionButton {...defaultClose} {...close} />}
                  {confirm && <ActionButton {...confirm} />}
                </footer>
              </motion.article>
            </>
          )}
        </AnimatePresence>
      </section>
    </Portal>
  );
}
