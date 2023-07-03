import React from 'react';
import { H3 } from '../../common/Typography';
import * as styles from './BasicDialog.css';
import { Color } from '@/styles/color';
import Button from '../../common/Button/Button';
import { ButtonVariantType } from '../../common/Button/Button.css';
import DialogBase, { DialogBaseProps } from './DialogBase';

interface ActionButtonProps {
  color?: Color;
  text?: string;
  variant?: ButtonVariantType;
  loading?: boolean;
  onClick?: () => void;
}
export interface BasicDialogProps extends DialogBaseProps {
  message?: string;
  /** dialog 버튼  */
  confirm?: ActionButtonProps;
  close?: ActionButtonProps;
  loading?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  color,
  text,
  loading,
  onClick
}) => {
  return (
    <Button
      loading={loading}
      variant={variant}
      color={color}
      onClick={onClick}
      size="small"
    >
      {text}
    </Button>
  );
};

export default function BasicDialog({
  open = false,
  message,
  confirm,
  close,
  loading,
  onClose
}: BasicDialogProps) {
  const defaultClose: ActionButtonProps = {
    text: confirm ? '취소' : '닫기',
    variant: 'line',
    onClick: onClose
  };
  return (
    <DialogBase open={open} onClose={onClose}>
      <main
        className={styles.contents}
        style={{ paddingBottom: '40px', paddingTop: '16px' }}
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
        {close && (
          <ActionButton {...defaultClose} {...close} loading={loading} />
        )}
        {confirm && <ActionButton {...confirm} loading={loading} />}
      </footer>
    </DialogBase>
  );
}
