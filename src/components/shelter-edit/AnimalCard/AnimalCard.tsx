import React from 'react';
import * as styles from './Animal.css';
import { Body4, Caption1 } from '@/components/common/Typography';
import Button from '@/components/common/Button/Button';
import { ObservationAnimal } from '@/api/shelter/observation-animal';
import { ANIMAL_GENDER_DICT } from '@/constants/animal';
import Image from 'next/image';

interface AnimalCardProps {
  data: ObservationAnimal;
  onClickEdit: () => void;
  onClickDelete: () => void;
}

export default function AnimalCard({
  data,
  onClickEdit,
  onClickDelete
}: AnimalCardProps) {
  const { profileImageUrl, name, breed, age, gender, specialNote } = data;
  return (
    <section className={styles.container}>
      <div className={styles.aniCard}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.image}
          src={profileImageUrl}
          width={48}
          height={48}
          alt={name}
        />
        <div>
          <Body4>{name}</Body4>
          <Caption1 color="gray600">
            {breed}, {age}세, {ANIMAL_GENDER_DICT[gender]}
          </Caption1>
        </div>
      </div>
      <hr className={styles.divider} />

      <Caption1 element={'p'} className={styles.textClamp} color="gray600">
        {specialNote}
      </Caption1>
      <div className={styles.buttonWarp}>
        <Button variant="line" size="xsmall" width="61px" onClick={onClickEdit}>
          수정
        </Button>
        <Button
          variant="line"
          size="xsmall"
          width="61px"
          onClick={onClickDelete}
        >
          삭제
        </Button>
      </div>
    </section>
  );
}
