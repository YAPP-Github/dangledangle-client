import React, { ForwardedRef } from 'react';
import * as styles from './LengthCounter.css';
/**
 * 글자 수 카운트하는 컴포넌트
 */

interface LengthCounterProps {
  max: number;
  initValueLength: number;
}
const LengthCounter = React.forwardRef(function LengthCounter(
  {
    max,
    initValueLength,
    ...props
  }: LengthCounterProps & React.HTMLProps<HTMLParagraphElement>,
  ref: ForwardedRef<HTMLParagraphElement>
) {
  return (
    <p className={styles.counter} ref={ref} {...props}>
      {initValueLength}/{max}
    </p>
  );
});
export default LengthCounter;
