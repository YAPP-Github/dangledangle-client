import { ButtonText1 } from '@/components/common/Typography';
import * as styles from './FloatingButton.css';
import { Add } from '@/asset/icons';
import { PropsWithChildren } from 'react';

interface FloatingButtonProps extends PropsWithChildren {
  onClick?: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  children,
  onClick
}) => {
  return (
    <div className={styles.floatingButton} onClick={onClick}>
      <div className={styles.inner}>
        <div className={styles.prefixIcon}>
          <Add />
        </div>
        <ButtonText1 color="white">{children}</ButtonText1>
      </div>
    </div>
  );
};

export default FloatingButton;
