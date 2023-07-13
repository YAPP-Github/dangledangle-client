import React from 'react';
import { Body3, Body4 } from '../Typography';
import * as styles from './Profile.css';

export default function Profile({ name }: { name: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <Body4 color="gray700">{name.slice(0, 1)}</Body4>
      </div>

      <Body3>{name}</Body3>
    </div>
  );
}
