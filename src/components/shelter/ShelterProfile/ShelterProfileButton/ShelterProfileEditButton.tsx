import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import * as styles from '../VolunteerFavoriteButtons/VolunteerFavoriteButtons.css';

export default function ShelterProfileEditButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('admin/shelter/edit');
  };
  return (
    <div className={styles.buttons}>
      <Button
        buttonColor="secondary"
        variant="line"
        size="small"
        onClick={handleClick}
      >
        프로필 수정하기
      </Button>
    </div>
  );
}
