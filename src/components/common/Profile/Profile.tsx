import React from 'react';
import { Body3, Body4, Caption3 } from '../Typography';
import * as styles from './Profile.css';

export default function Profile({
  name,
  waiting = false
}: {
  name: string;
  waiting?: boolean;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <Body4 color="gray700">{name.slice(0, 1)}</Body4>
      </div>
      <div className={styles.textWrap}>
        <Body3>{name}</Body3>
        {waiting && <Caption3 color="error">신청대기</Caption3>}
      </div>
    </div>
  );
}
