import { PropsWithChildren } from 'react';
import * as styles from './FixedFooter.css';

interface FixedFooterProps extends PropsWithChildren {}

const FixedFooter: React.FC<FixedFooterProps> = ({ children }) => {
  return (
    <footer className={styles.fixedFooter}>
      <div className={styles.wrapper}>{children}</div>
    </footer>
  );
};

export default FixedFooter;
