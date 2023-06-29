import { Donation, Instagram, Notification, Specific } from '@/asset/icons';
import Button from '@/components/common/Button/Button';
import Carousel from '@/components/common/Carousel/Carousel';
import EmphasizedTitle, {
  E,
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { ButtonText1, H2 } from '@/components/common/Typography';
import CarouselItem from '@/components/shelter/CarouselItem/CarouselItem';
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
          <Line>잠깐!🤚 추가 정보 입력하면 보호소 파트너로</Line>
          <Line>
            다음과 같은 <E>추가 기능</E>들을
          </Line>
          <Line>무료로 이용하실 수 있어요</Line>
        </EmphasizedTitle>
      </div>

      <Carousel>
        {carouselItems.map(({ icon, title, description }, index) => (
          <CarouselItem
            key={index}
            icon={icon}
            index={index}
            title={title}
            description={description}
          />
        ))}
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

const carouselItems = [
  {
    icon: Instagram,
    title: '인스타그램 계정 연동',
    description:
      '인스타그램 계정 주소를 입력하시면, 봉사자들이 인스타그램 계정으로\n바로 이동해서 다른 유기동물 친구들도 살펴볼 수 있어요.'
  },
  {
    icon: Donation,
    title: '후원 모금 기능',
    description:
      '후원금을 모금할 수 있는 계좌정보를 공지할 수 있어요. 카카오페이 송금\n기능을 통해 간편하게 후원금을 모금할 수 있어요.'
  },
  {
    icon: Notification,
    title: '사전 안내사항 자동 발송',
    description:
      '보호소를 방문하기 1일 전 봉사자에게 카톡으로 일정알림과 방문 전\n숙지해야할 안내사항을 자동으로 발송해드려요.'
  },
  {
    icon: Specific,
    title: '특별 케어 동물 정보 안내',
    description:
      '건강 문제, 돌발 행동 등 특별 관리가 필요한 동물들의 정보를\n입력/관리하고 봉사자에게 안내해보세요.'
  }
];
