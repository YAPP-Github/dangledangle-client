import useToast from '@/hooks/useToast';
import * as styles from './VolunteerFavoriteButtons.css';
import Button from '../common/Button/Button';

const fetchedData = {
  isFavorited: false
};

interface ShelterProfileButtonsProps {
  donation: string;
}
export default async function AddFavoriteButtons({
  donation
}: ShelterProfileButtonsProps) {
  const toastOn = useToast();

  // TODO: 보호소 즐겨찾기 정보 가져오기
  const { isFavorited } = await (async params => {
    return new Promise<typeof fetchedData>(resolve =>
      setTimeout(() => resolve(fetchedData), 0)
    );
  })();

  // TODO : 즑겨찾기 추가/삭제 API 호출
  const handleFavoriteClick = () => {
    toastOn('즐겨찾기가 추가되었습니다.');
  };

  const handleDonationClick = () => {
    navigator.clipboard.writeText(donation);
    toastOn('후원 계좌번호가 복사되었습니다.');
  };

  return (
    <div className={styles.buttons}>
      <Button
        buttonColor="secondary"
        size="small"
        onClick={handleFavoriteClick}
        variant={isFavorited ? 'filled' : 'line'}
        color={isFavorited ? 'white' : 'secondary'}
      >
        {isFavorited ? '즐겨찾기' : '즐겨찾기 해제'}
      </Button>
      <Button
        buttonColor="secondary"
        size="small"
        variant="line"
        color="white"
        onClick={handleDonationClick}
      >
        간편후원
      </Button>
    </div>
  );
}
