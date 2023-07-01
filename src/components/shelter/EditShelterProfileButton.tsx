import Button from '../common/Button/Button';
import * as styles from './AddFavoriteButtons.css';

interface EditShelterProfileButtonProps {}
export default function EditShelterProfileButton({}: EditShelterProfileButtonProps) {
  return (
    <div className={styles.buttons}>
      <Button buttonColor="secondary" variant="line" size="small">
        프로필 수정하기
      </Button>
    </div>
  );
}
