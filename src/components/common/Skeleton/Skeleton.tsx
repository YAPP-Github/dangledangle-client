import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './Skeleton.css';
export interface SkeletonProps {
  isShelter?: boolean;
}
export default function Skeleton({ isShelter = false }: SkeletonProps) {
  function createSkeleton(
    variant: 'square' | 'circle',
    width: string,
    height: string
  ) {
    return (
      <div
        className={styles.box({ variant })}
        style={assignInlineVars({
          [styles.skeletonWidth]: width,
          [styles.skeletonHeight]: height
        })}
      ></div>
    );
  }

  return (
    <main className={styles.wrapper}>
      <article className={styles.grid({ size: 'md' })}>
        <section className={styles.inlineGrid({ size: 'md' })}>
          {createSkeleton('square', '52px', '26px')}
          {createSkeleton('square', '69px', '26px')}
        </section>
        {createSkeleton('square', '100%', '22px')}
        <section className={styles.grid({ size: 'sm' })}>
          {createSkeleton('square', '180px', '20px')}
          {createSkeleton('square', '60px', '20px')}
        </section>
        {isShelter && (
          <section className={styles.inlineGrid({ size: 'sm' })}>
            {createSkeleton('circle', '20px', '20px')}
            {createSkeleton('square', '100px', '20px')}
          </section>
        )}
      </article>
    </main>
  );
}
