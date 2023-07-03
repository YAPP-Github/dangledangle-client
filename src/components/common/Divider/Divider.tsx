import { useEffect, useMemo, useRef } from 'react';
import * as styles from './Divider.css';
import clsx from 'clsx';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface DividerProps {
  className?: string;
  style?: React.CSSProperties;
  spacing?: number | number[];
}

const Divider: React.FC<DividerProps> = ({ className, style, spacing }) => {
  const ref = useRef<HTMLHRElement>(null);
  useEffect(() => {
    function adjustWidth() {
      if (ref.current) {
        const width = document.body.clientWidth;
        ref.current.style.width = `${width}px`;
      }
    }
    adjustWidth();
    window.addEventListener('resize', adjustWidth);
    return () => {
      window.removeEventListener('resize', adjustWidth);
    };
  }, []);
  const [marginTop, marginBottom] = useMemo(() => {
    if (typeof spacing === 'number') {
      return [`${spacing}px`, `${spacing}px`];
    } else if (typeof spacing === 'object') {
      return [`${spacing[0]}px`, `${spacing[1]}px`];
    } else {
      return ['0px', '0px'];
    }
  }, [spacing]);

  return (
    <hr
      ref={ref}
      className={clsx(className, styles.divider)}
      style={{
        ...style,
        ...assignInlineVars({
          [styles.marginTop]: marginTop,
          [styles.marginBottom]: marginBottom
        })
      }}
    />
  );
};

export default Divider;
