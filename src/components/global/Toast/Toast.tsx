import React from 'react';
import * as styles from './Toast.css';
import clsx from 'clsx';
import { Caption1 } from '@/components/common/Typography';

export interface ToastProps {
  visible: boolean;
  message?: string;
}
const Toast: React.FC<ToastProps> = ({ visible, message }) => {
  console.log(visible);
  return (
    <div
      className={clsx(
        styles.toastContainer,
        visible ? styles.visible : styles.hidden
      )}
    >
      <div className={styles.messageWrapper}>
        <Caption1
          className={clsx(visible ? styles.visible : styles.hidden)}
          color="background"
        >
          {message}
        </Caption1>
      </div>
    </div>
  );
};

export { Toast };
