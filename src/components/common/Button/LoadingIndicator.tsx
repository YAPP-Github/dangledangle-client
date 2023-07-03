import * as styles from './LoadingIndicator.css';
interface LoadingIndicatorProps {}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({}) => {
  return (
    <div className={styles.container}>
      <div className={styles.circle} />
      <div className={styles.circle} />
      <div className={styles.circle} />
    </div>
  );
};

export default LoadingIndicator;
