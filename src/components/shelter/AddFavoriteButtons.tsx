import Button from '../common/Button/Button';
import * as styles from './AddFavoriteButtons.css';

interface ShelterProfileButtonsProps {
  donation: string;
}
export default function AddFavoriteButtons({}: ShelterProfileButtonsProps) {
  return (
    <div className={styles.buttons}>
      <Button buttonColor="secondary" size="small">
        즐겨찾기
      </Button>
      <Button buttonColor="secondary" size="small" variant="line" color="white">
        간편후원
      </Button>
    </div>
  );
}
