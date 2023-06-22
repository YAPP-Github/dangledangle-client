'use client';
import { container } from '@/app/layout.css';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import Button from '@/components/common/Button/Button';
import { H2 } from '@/components/common/Typography';
import useBooleanState from '@/hooks/useBooleanState';
import useHeader from '@/hooks/useHeader';
import Image from 'next/image';
import * as styles from './CompleteSheet.css';
import { MouseEventHandler } from 'react';

interface CompleteSheetPops {
  message: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonTitle: string;
}
export default function CompleteSheet({
  message,
  onClick,
  buttonTitle
}: CompleteSheetPops) {
  const [isOpened, openDialog, closeDialog] = useBooleanState(true);
  const setHeader = useHeader({ isHeader: 'hidden' });

  return (
    <>
      <BottomSheet
        isOpened={isOpened}
        onClose={closeDialog}
        className={styles.bottomSheet}
      >
        <div className={container}>
          <div className={styles.contents}>
            <Image
              width={300}
              height={300}
              src="/sparkle.png"
              className={styles.image}
              alt="sparkle"
            />

            <div className={styles.titleGroup}>
              {message?.split('<br/>').map((value, index) => {
                return (
                  <H2 key={index}>
                    {value}
                    <br />
                  </H2>
                );
              })}
            </div>
            <Button onClick={onClick} className={styles.button}>
              {buttonTitle}
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
