import * as styles from './Badge.css';
interface BadgeProps {
  type?: 'primary' | 'gray';
  children: string;
}

const Badge: React.FC<BadgeProps> = ({ type = 'primary', children }) => {
  return (
    <span
      className={styles.badge({
        type: type
      })}
    >
      {children}
    </span>
  );
};

export default Badge;
