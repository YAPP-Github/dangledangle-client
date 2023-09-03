import Button from '@/components/common/Button/Button';
import { H2, H3 } from '@/components/common/Typography';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import * as styles from './../styles.css';
import { DaenggleLogo } from '@/asset/icons';
import useHeader from '@/hooks/useHeader';

export default function RegisterComplete() {
  const router = useRouter();
  useHeader({ isHeader: 'hidden' });
  return (
    <div className={styles.finish}>
      <DaenggleLogo
        style={{
          position: 'absolute',
          top: 100,
          margin: 'auto',
          display: 'block'
        }}
      />
      <Image
        width={320}
        height={310}
        src="/images/Particle.png"
        alt="particle"
        style={{ zIndex: 1 }}
      />
      <H2 style={{ margin: '41px 0 10px 0' }}>가입 완료!</H2>
      <H3 color="gray600" style={{ textAlign: 'center' }}>
        운영에 필요한 봉사를 선택하여
        <br />
        도움을 요청해 보세요!
      </H3>
      <Button
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          location.href = '/';
        }}
        style={{ marginTop: '112px' }}
      >
        홈 살펴보러 가기
      </Button>
    </div>
  );
}
