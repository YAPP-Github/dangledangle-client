'use client';
import { H2 } from '@/components/common/Typography';
import BottomSheet from '@/components/common/BottomSheet/BottomSheet';
import useBooleanState from '@/hooks/useBooleanState';
import { useCallback } from 'react';
import Button from '@/components/common/Button/Button';
import * as styles from './RegisterComplete.css';
import { container } from '@/app/layout.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useHeader from '@/hooks/useHeader';
import Cookies from 'js-cookie';
import { COOKIE_REGISTER_EMAIL_KEY } from '@/constants/cookieKeys';

export default function RegisterComplete() {
  const [isOpened, openDialog, closeDialog] = useBooleanState(true);
  const router = useRouter();
  useHeader({ isHeader: 'hidden' });
  const handleClick = useCallback(async () => {
    Cookies.remove(COOKIE_REGISTER_EMAIL_KEY);
    closeDialog();
    router.replace('/');
  }, []);

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
