import { assignInlineVars } from '@vanilla-extract/dynamic';
import Skeleton, { SkeletonProps } from './Skeleton';
import * as styles from './Skeleton.css';

/**
 * Skeleton이 render 되는 시간을 조정하고 싶을 시
 * DeferredComponent로 감싸서 이용합니다.
 *
 * @param {SkeletonProps} isShelter 보호소 전용 스켈레톤을 렌더할 수 있습니다.
 * @returns {JSX.Element} The SkeletonList element.
 */
export default function SkeletonList({ isShelter }: SkeletonProps) {
  return (
    <div className={styles.list}>
      <div style={{ padding: '2px' }}></div>
      <div
        className={styles.box({ variant: 'square' })}
        style={assignInlineVars({
          [styles.skeletonWidth]: '73px',
          [styles.skeletonHeight]: '26px'
        })}
      ></div>
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} isShelter={isShelter ? true : false} />
      ))}
    </div>
  );
}
