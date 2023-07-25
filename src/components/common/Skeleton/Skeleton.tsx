import { assignInlineVars } from '@vanilla-extract/dynamic';
import * as styles from './Skeleton.css';

export interface SkeletonProps {
  isShelter?: boolean;
}

export default function Skeleton({ isShelter = false }: SkeletonProps) {
  return (
    <main className={styles.wrapper}>
      <article className={styles.grid({ size: 'md' })}>
        <section className={styles.inlineGrid({ size: 'md' })}>
          <div
            className={styles.box({ variant: 'square' })}
            style={assignInlineVars({
              [styles.skeletonWidth]: '52px',
              [styles.skeletonHeight]: '26px'
            })}
          ></div>
          <div
            className={styles.box({ variant: 'square' })}
            style={assignInlineVars({
              [styles.skeletonWidth]: '69px',
              [styles.skeletonHeight]: '26px'
            })}
          ></div>
        </section>
        <section
          className={styles.box({ variant: 'square' })}
          style={assignInlineVars({
            [styles.skeletonWidth]: '100%',
            [styles.skeletonHeight]: '22px'
          })}
        ></section>
        <section className={styles.grid({ size: 'sm' })}>
          <div
            className={styles.box({ variant: 'square' })}
            style={assignInlineVars({
              [styles.skeletonWidth]: '180px',
              [styles.skeletonHeight]: '20px'
            })}
          ></div>
          <div
            className={styles.box({ variant: 'square' })}
            style={assignInlineVars({
              [styles.skeletonWidth]: '60px',
              [styles.skeletonHeight]: '20px'
            })}
          ></div>
        </section>
        {isShelter && (
          <section className={styles.inlineGrid({ size: 'sm' })}>
            <div
              className={styles.box({ variant: 'circle' })}
              style={assignInlineVars({
                [styles.skeletonWidth]: '20px',
                [styles.skeletonHeight]: '20px'
              })}
            ></div>
            <div
              className={styles.box({ variant: 'square' })}
              style={assignInlineVars({
                [styles.skeletonWidth]: '100px',
                [styles.skeletonHeight]: '20px'
              })}
            ></div>
          </section>
        )}
      </article>
    </main>
  );
}
