import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './Skeleton.css';

interface SkeletonProps {}

export default function Skeleton({}: SkeletonProps) {
  return (
    <main className={styles.wrapper}>
      <article className={styles.grid}>
        <section className={styles.inlineGrid}>
          <div
            className={styles.box}
            style={assignInlineVars({
              [styles.skeletonWidth]: '52px',
              [styles.skeletonHeight]: '26px'
            })}
          ></div>
          <div
            className={styles.box}
            style={assignInlineVars({
              [styles.skeletonWidth]: '69px',
              [styles.skeletonHeight]: '26px'
            })}
          ></div>
        </section>
        <section
          className={styles.box}
          style={assignInlineVars({
            [styles.skeletonWidth]: '100%',
            [styles.skeletonHeight]: '22px'
          })}
        ></section>
        <section className={styles.colGrid}>
          <div
            className={styles.box}
            style={assignInlineVars({
              [styles.skeletonWidth]: '180px',
              [styles.skeletonHeight]: '20px'
            })}
          ></div>
          <div
            className={styles.box}
            style={assignInlineVars({
              [styles.skeletonWidth]: '60px',
              [styles.skeletonHeight]: '20px'
            })}
          ></div>
        </section>
      </article>
    </main>
  );
}
