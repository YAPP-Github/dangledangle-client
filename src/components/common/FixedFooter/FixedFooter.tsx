import { PropsWithChildren } from 'react';
import * as styles from './FixedFooter.css';
import { palette } from '@/styles/color';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface FixedFooterProps extends PropsWithChildren {
  color?: string;
}

const FixedFooter: React.FC<FixedFooterProps> = ({
  color = palette.background,
  children
}) => {
  return (
    <footer className={styles.fixedFooter}>
      <div
        className={styles.wrapper}
        style={assignInlineVars({
          [styles.footerColor]: color
        })}
      >
        {children}
      </div>
    </footer>
  );
};

export default FixedFooter;
