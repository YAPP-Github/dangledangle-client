import Button from '@/components/common/Button/Button';
import { H2, H3 } from '@/components/common/Typography';
import Image from 'next/image';
import { OnNextProps } from '../page';
import * as styles from './../styles.css';
import useHeader from '@/hooks/useHeader';

export default function RequireComplete({ onNext }: OnNextProps) {
  useHeader({ isHeader: 'hidden' });
  return (
    <div className={styles.complete}>
      <Image
        width={100}
        height={100}
        src="/images/CheckRequire.png"
        alt="sparkle"
      />
      <H2 style={{ margin: '116px 0 10px 0' }}>필수 입력 정보 완료!</H2>
      <H3 color="gray600" style={{ textAlign: 'center' }}>
        댕글댕글에 오신 것을 환영해요!
      </H3>
      <Button onClick={onNext} style={{ marginTop: '152px' }}>
        다음
      </Button>
    </div>
  );
}
