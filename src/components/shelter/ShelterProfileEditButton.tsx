import Button from '../common/Button/Button';
import * as styles from './VolunteerFavoriteButtons.css';

interface ShelterProfileEditButtonProps {}
export default function ShelterProfileEditButton({}: ShelterProfileEditButtonProps) {
  return (
    <div className={styles.buttons}>
      <Button buttonColor="secondary" variant="line" size="small">
        프로필 수정하기
      </Button>
    </div>
  );
}
