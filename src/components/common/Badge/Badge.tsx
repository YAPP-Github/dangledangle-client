import clsx from 'clsx';
import { Caption1 } from '../Typography';
import * as styles from './Badge.css';
interface BadgeProps {
  type?: 'primary' | 'gray';
  children: string;
}

const Badge: React.FC<BadgeProps> = ({ type = 'primary', children }) => {
  return (
    <span className={clsx(styles.badge, styles.badgeColor[type])}>
      <Caption1 className={styles.badgeColor[type]}>{children}</Caption1>
    </span>
  );
};

export default Badge;
