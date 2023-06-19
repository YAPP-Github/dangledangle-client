import React from 'react';
import * as styles from './Animal.css';
import { Dog } from '@/asset/icons';
import { Body4, Caption1 } from '@/components/common/Typography';
import Button from '@/components/common/Button/Button';
import Divider from '@/components/common/Divider/Divider';
import { Animal } from '@/app/animal/page';

interface AnimalCardProps {
  data: Animal;
}

export default function AnimalCard({ data }: AnimalCardProps) {
  const { name, specipic, age, gender, special_note } = data;
  return (
    <section className={styles.container}>
      <div className={styles.aniCard}>
        <Dog />
        <div>
          <Body4>{name}</Body4>
          <Caption1 color="gray600">
            {specipic}, {age}세, {gender}
          </Caption1>
        </div>
      </div>
      {/* <Divider spacing={10} style={{ width: '100%' }} /> */}
      <div className={styles.divider} />

      <Caption1 className={styles.textClamp}>{special_note}</Caption1>
      <div className={styles.buttonWarp}>
        <Button variant="line" size="small" className={styles.button}>
          <Caption1>수정</Caption1>
        </Button>
        <Button variant="line" size="small" className={styles.button}>
          <Caption1>삭제</Caption1>
        </Button>
      </div>
    </section>
  );
}
