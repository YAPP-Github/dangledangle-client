import { Close } from '@/asset/icons';
import React from 'react';
import * as styles from './Modal.css';
import DialogBase, {
  DialogBaseProps
} from '@/components/global/Dialog/DialogBase';

export interface ModalProps extends DialogBaseProps {}

export default function Modal({ open = false, onClose, children }: ModalProps) {
  return (
    <DialogBase open={open} onClose={onClose}>
      <header className={styles.header}>
        <Close className={styles.closeIcon} onClick={onClose} />
      </header>
      <main className={styles.contents}>
        <div className={styles.childrenWarp}>{children}</div>
      </main>
    </DialogBase>
  );
}
