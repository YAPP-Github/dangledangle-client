import Button from '@/components/common/Button/Button';
import Carousel from '@/components/common/Carousel/Carousel';
import EmphasizedTitle, {
  E,
  Line
} from '@/components/common/EmphasizedTitle/EmphasizedTitle';
import { ButtonText1 } from '@/components/common/Typography';
import CarouselItem from '@/components/shelter/CarouselItem/CarouselItem';
import useHeader from '@/hooks/useHeader';
import { useRouter } from 'next/navigation';
import { OnNextProps } from '../page';
import * as styles from '../styles.css';
import { Register_1, Register_2, Register_3, Register_4 } from '@/asset/icons';

export default function Additional({ onNext }: OnNextProps) {
  const router = useRouter();
  useHeader({ title: '추가 정보' });

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
          router.push('/admin/shelter/edit/extra#register');
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
    icon: Register_1,
    title: '인스타그램 계정 연동',
    description: [
      '인스타그램 계정 주소를 입력하시면,',
      <br key="linebreak1" />,
      '봉사자들이 인스타그램 계정으로',
      <br key="linebreak2" />,
      '바로 이동해서 다른 유기동물 친구들도',
      <br key="linebreak3" />,
      '살펴볼 수 있어요.'
    ]
  },
  {
    icon: Register_2,
    title: '후원 모금 기능',
    description: [
      '후원금을 모금할 수 있는',
      <br key="linebreak1" />,
      '계좌정보를 공지할 수 있어요.',
      <br key="linebreak2" />,
      '카카오페이 송금 기능을 통해',
      <br key="linebreak3" />,
      '간편하게 후원금을 모금할 수 있어요.'
    ]
  },
  {
    icon: Register_3,
    title: '사전 안내사항 자동 발송',
    description: [
      '보호소를 방문하기 1일 전',
      <br key="linebreak1" />,
      '봉사자에게 카톡으로 일정알림과',
      <br key="linebreak2" />,
      '방문 전 숙지해야할 안내사항을',
      <br key="linebreak3" />,
      '자동으로 발송해드려요.'
    ]
  },
  {
    icon: Register_4,
    title: '특별 케어 동물 정보 안내',
    description: [
      '건강 문제, 돌발 행동 등',
      <br key="linebreak1" />,
      '특별 관리가 필요한 동물들의 정보를',
      <br key="linebreak2" />,
      '입력/관리하고',
      <br key="linebreak3" />,
      '봉사자에게 안내해보세요.'
    ]
  }
];
