import React, { useCallback, useState } from 'react';
import {
  container,
  dialogOverlay,
  modalBlock,
  close,
  contents,
  typograpy,
  modalHide,
  modalBgHide,
  modalBgShow,
  modalShow,
  buttonWrapper
} from './ConfirmDialog.css';
import Image from 'next/image';
import CloseSquare from 'public/icons/Close-Square.svg';
import ConfirmButton from './ConfirmButton';

interface ConfirmDialogProps {
  /** dialog status */
  open: boolean;
  /** dialog message - @/utils/setting/settingConstEnum  */
  message: string;
  /** dialog close function  */
  onClose: () => void;
  /** dialog 추가버튼  */
  actionButton?: boolean;
  /** dialog 추가버튼 타이틀  */
  actionTitle?: string;
  /** dialog 추가버튼 callback  */
  onActionClick?: () => void;
  children?: React.ReactNode;
}

export default function ConfirmDialog({
  open = false,
  message,
  onClose,
  actionButton = false,
  actionTitle = '저장',
  onActionClick,
  children,
  ...rest
}: ConfirmDialogProps) {
  const [closing, setClosing] = useState(false);

  const backgroundAnimation = closing
    ? { animation: `${modalBgHide} 0.4s` }
    : { animation: `${modalBgShow} 0.4s` };

  const modalBlockAnimation = closing
    ? { animation: `${modalHide} 0.4s` }
    : { animation: `${modalShow} 0.4s` };

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleClosingAnimation = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      handleClose();
      setClosing(false);
    }, 400);
  }, [handleClose]);

  const handleConfrim = useCallback(() => {
    if (onActionClick) {
      onActionClick();
    }
    handleClosingAnimation();
  }, [onActionClick, handleClosingAnimation]);

  return (
    <>
      {open && (
        <section className={container}>
          <div
            className={dialogOverlay}
            style={backgroundAnimation}
            onClick={handleClosingAnimation}
          />

          <article className={modalBlock} style={modalBlockAnimation} {...rest}>
            <header className={close}>
              <Image
                src={CloseSquare}
                alt="close"
                onClick={handleClosingAnimation}
              />
            </header>

            <main className={contents}>
              <div>
                {message.split('<br/>').map((value, index) => {
                  return (
                    <p key={index} className={typograpy}>
                      {value}
                      <br />
                    </p>
                  );
                })}
              </div>
              <div>{children}</div>
            </main>

            <footer className={buttonWrapper}>
              {actionButton ? (
                <>
                  <ConfirmButton title={actionTitle} onClick={handleConfrim} />
                  <ConfirmButton
                    title="닫기"
                    onClick={handleClosingAnimation}
                  />
                </>
              ) : (
                <ConfirmButton title="닫기" onClick={handleClosingAnimation} />
              )}
            </footer>
          </article>
        </section>
      )}
    </>
  );
}
