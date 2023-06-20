'use client';
import { H2 } from '@/components/common/Typography';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import useBooleanState from '@/hooks/useBooleanState';
import { useCallback, useLayoutEffect } from 'react';
import Button from '@/components/common/Button/Button';
import { useSetRecoilState } from 'recoil';
import * as styles from './RegisterComplete.css';
import { headerState } from '@/store/header';
import { container } from '@/app/layout.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function RegisterComplete() {
  const [isOpened, openDialog, closeDialog] = useBooleanState(true);
  const router = useRouter();
  const setHeader = useSetRecoilState(headerState);
  const handleClick = useCallback(() => {
    closeDialog();
    router.replace('/volunteer');
  }, []);

  useLayoutEffect(() => {
    setHeader({ title: '', entirePage: null, thisPage: null });
  });
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
              <H2>가입완료!</H2>
              <H2>같이 세상을 바꿔볼까요?</H2>
            </div>
            <Button onClick={handleClick} className={styles.button}>
              홈 살펴보러 가기
            </Button>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
