import React from 'react';
import * as styles from './Animal.css';
import { Dog } from '@/asset/icons';
import { Body4, Caption1 } from '@/components/common/Typography';
import Button from '@/components/common/Button/Button';
import { ObservationAnimal } from '@/api/shelter/observation-animal';

interface AnimalCardProps {
  data: ObservationAnimal;
}

export default function AnimalCard({ data }: AnimalCardProps) {
  const { name, breed, age, gender, specialNote } = data;
  return (
    <section className={styles.container}>
      <div className={styles.aniCard}>
        <Dog />
        <div>
          <Body4>{name}</Body4>
          <Caption1 color="gray600">
            {breed}, {age}세, {gender}
          </Caption1>
        </div>
      </div>
      {/* <Divider spacing={10} style={{ width: '100%' }} /> */}
      <div className={styles.divider} />

      <Caption1 className={styles.textClamp}>{specialNote}</Caption1>
      <div className={styles.buttonWarp}>
        <Button variant="line" size="xsmall" width="61px">
          수정
        </Button>
        <Button variant="line" size="xsmall" width="61px">
          삭제
        </Button>
      </div>
    </section>
  );
}