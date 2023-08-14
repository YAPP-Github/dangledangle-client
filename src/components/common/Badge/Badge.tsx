import clsx from 'clsx';
import { Caption3 } from '../Typography';
import * as styles from './Badge.css';
interface BadgeProps {
  type?: 'primary' | 'gray' | 'line' | 'success';
  children: string;
}

const Badge: React.FC<BadgeProps> = ({ type = 'primary', children }) => {
  return (
    <span
      className={clsx(
        styles.badge,
        styles.badgeColor[type],
        type === 'line' ? styles.badgeBoarder : null
      )}
    >
      <Caption3 className={styles.badgeColor[type]}>{children}</Caption3>
    </span>
  );
};

export default Badge;
