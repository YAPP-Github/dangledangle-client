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
  handleClose: () => void;
  /** dialog 추가버튼  */
  actionButton?: boolean;
  /** dialog 추가버튼 callback  */
  actionCallback?: () => void;
  children?: React.ReactNode;
}

export default function ConfirmDialog({
  open = false,
  message,
  handleClose,
  actionButton = false,
  actionCallback,
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

  const startClosingAnimation = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      handleClose();
      setClosing(false);
    }, 400);
  }, [handleClose]);

  const handleConfrim = () => {
    if (actionCallback) {
      actionCallback();
    }
    startClosingAnimation();
  };

  return (
    <>
      {open && (
        <section className={container}>
          <div
            className={dialogOverlay}
            style={backgroundAnimation}
            onClick={startClosingAnimation}
          />

          <article className={modalBlock} style={modalBlockAnimation} {...rest}>
            <header className={close}>
              <Image
                src={CloseSquare}
                alt="close"
                onClick={startClosingAnimation}
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
                  <ConfirmButton title="저장" handleButton={handleConfrim} />
                  <ConfirmButton
                    title="닫기"
                    handleButton={startClosingAnimation}
                  />
                </>
              ) : (
                <ConfirmButton
                  title="닫기"
                  handleButton={startClosingAnimation}
                />
              )}
            </footer>
          </article>
        </section>
      )}
    </>
  );
}
