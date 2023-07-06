import * as styles from './LoadingIndicator.css';
interface LoadingIndicatorProps {
  color?: 'basic' | 'primary';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  color = 'basic'
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.circle({ color })} />
      <div className={styles.circle({ color })} />
      <div className={styles.circle({ color })} />
    </div>
  );
};

export default LoadingIndicator;
