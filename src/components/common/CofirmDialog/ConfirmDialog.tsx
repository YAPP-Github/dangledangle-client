import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { H2 } from '../typography';
import ConfirmButton from './ConfirmButton';
import * as styles from './ConfirmDialog.css';
import Portal from './Portal/Portal';
import useResize from './hooks/useResize';
import { CloseSquare } from '@/asset/icons';

interface ConfirmDialogProps {
  /** dialog status */
  open: boolean;
  /** dialog close function  */
  onClose: () => void;
  /** dialog message - @/utils/setting/settingConstEnum  */
  message?: string;
  /** dialog 요소 */
  children?: React.ReactNode;
  /** dialog 추가버튼  */
  actionButton?: boolean;
  /** dialog 추가버튼 타이틀  */
  actionTitle?: string;
  /** dialog 추가버튼 callback  */
  onActionClick?: () => void;
}

export default function ConfirmDialog({
  open = false,
  message,
  onClose,
  actionButton = false,
  actionTitle = '저장',
  onActionClick,
  children
}: ConfirmDialogProps) {
  const { modalSize, modalRef } = useResize(open);

  const [closing, setClosing] = useState(false);

  const backgroundAnimation = closing
    ? { animation: `${styles.modalBgHide} 0.4s` }
    : { animation: `${styles.modalBgShow} 0.4s` };

  const modalBlockAnimation = closing
    ? { animation: `${styles.modalHide} 0.4s` }
    : { animation: `${styles.modalShow} 0.4s` };

  const handleClosingAnimation = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 400);
  }, [onClose]);

  const handleConfrim = useCallback(() => {
    if (onActionClick) {
      onActionClick();
    }
    handleClosingAnimation();
  }, [onActionClick, handleClosingAnimation]);

  return (
    <Portal>
      {open && (
        <section className={styles.container}>
          <div
            className={styles.dialogOverlay}
            style={backgroundAnimation}
            onClick={handleClosingAnimation}
          />
          <>
            <article
              className={clsx(styles.modalConatainer({ size: modalSize }))}
              ref={modalRef}
              style={modalBlockAnimation}
            >
              <header className={styles.header}>
                <CloseSquare onClick={handleClosingAnimation} />
              </header>

              <main className={styles.contents}>
                <div>
                  {message?.split('<br/>').map((value, index) => {
                    return (
                      <H2 key={index} style={{ textAlign: 'center' }}>
                        {value}
                        <br />
                      </H2>
                    );
                  })}
                </div>
                <div className={styles.childrenWarp}>{children}</div>
              </main>

              <footer className={styles.buttonWrapper}>
                {actionButton ? (
                  <>
                    <ConfirmButton onClick={handleConfrim}>
                      {actionTitle}
                    </ConfirmButton>
                    <ConfirmButton onClick={handleClosingAnimation}>
                      닫기
                    </ConfirmButton>
                  </>
                ) : (
                  <ConfirmButton onClick={handleClosingAnimation}>
                    닫기
                  </ConfirmButton>
                )}
              </footer>
            </article>
          </>
        </section>
      )}
    </Portal>
  );
}
