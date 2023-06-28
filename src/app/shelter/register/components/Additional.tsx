import { Donation, Instagram, Notification, Specific } from '@/asset/icons';
import Button from '@/components/common/Button/Button';
import Carousel from '@/components/common/Carousel/Carousel';
import EmphasizedTitle, {
  E,
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { Body3, ButtonText1, H2, H4 } from '@/components/common/Typography';
import useHeader from '@/hooks/useHeader';
import { useRouter } from 'next/navigation';
import { OnNextProps } from '../page';
import * as styles from '../styles.css';

export default function Additional({ onNext }: OnNextProps) {
  const router = useRouter();
  const setHeader = useHeader({ title: '추가 정보' });

  return (
    <>
      <div className={styles.titleWrapper} style={{ marginBottom: '54px' }}>
        <EmphasizedTitle>
          <H2>잠깐!🤚 추가 정보 입력하면 보호소 파트너로</H2>
          <Line>
            <H2>
              다음과 같은 <E>추가 기능</E>들을
            </H2>
          </Line>
          <H2>무료로 이용하실 수 있어요</H2>
        </EmphasizedTitle>
      </div>

      <Carousel>
        <div className={styles.item}>
          <Instagram />
          <Body3 color="gray600" className={styles.carouselText}>
            01.
          </Body3>
          <H4 color="gray900" style={{ marginBottom: '12px' }}>
            인스타그램 계정 연동
          </H4>
          <Body3 color="gray900" style={{ maxWidth: '220px' }}>
            인스타그램 계정 주소를 입력하시면, 봉사자들이 인스타그램 계정으로
            바로 이동해서 다른 유기동물 친구들도 살펴볼 수 있어요.
          </Body3>
        </div>

        <div className={styles.item}>
          <Donation />
          <Body3 color="gray600" className={styles.carouselText}>
            02.
          </Body3>
          <H4 color="gray900" style={{ marginBottom: '12px' }}>
            후원 모금 기능
          </H4>
          <Body3 color="gray900" style={{ maxWidth: '220px' }}>
            후원금을 모금할 수 있는 계좌정보를 공지할 수 있어요. 카카오페이 송금
            기능을 통해 간편하게 후원금을 모금할 수 있어요.
          </Body3>
        </div>

        <div className={styles.item}>
          <Notification />
          <Body3 color="gray600" className={styles.carouselText}>
            03.
          </Body3>
          <H4 color="gray900" style={{ marginBottom: '12px' }}>
            사전 안내사항 자동 발송
          </H4>
          <Body3 color="gray900" style={{ maxWidth: '220px' }}>
            보호소를 방문하기 1일 전 봉사자에게 카톡으로 일정알림과 방문 전
            숙지해야할 안내사항을 자동으로 발송해드려요.
          </Body3>
        </div>

        <div className={styles.item}>
          <Specific />
          <Body3 color="gray600" className={styles.carouselText}>
            04.
          </Body3>
          <H4 color="gray900" style={{ marginBottom: '12px' }}>
            특별 케어 동물 정보 안내
          </H4>
          <Body3 color="gray900" style={{ maxWidth: '220px' }}>
            보호소를 방문하기 1일 전 봉사자에게 카톡으로 일정알림과 방문 전
            숙지해야할 안내사항을 자동으로 발송해드려요.
          </Body3>
        </div>
      </Carousel>

      <Button
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          router.push('/admin/shelter/edit/extra');
        }}
        style={{ marginTop: '40px' }}
      >
        다음
      </Button>
      <div className={styles.carouselBtnWrap}>
        <ButtonText1
          color="gray400"
          onClick={onNext}
          className={styles.carouselBtnText}
        >
          다음에 하기
        </ButtonText1>
      </div>
    </>
  );
}
