import React from 'react';
import * as styles from './Animal.css';
import { Body4, Caption1 } from '@/components/common/Typography';
import Button from '@/components/common/Button/Button';
import Image from 'next/image';
import { ANIMAL_GENDER_DICT } from '@/constants/animal';
import { ObservationAnimal } from '@/types/shelter';

interface AnimalCardProps {
  data: ObservationAnimal;
  mode?: 'edit' | 'view';
  onClickEdit?: () => void;
  onClickDelete?: () => void;
}

export default function AnimalCard({
  data,
  onClickEdit,
  onClickDelete,
  mode = 'view'
}: AnimalCardProps) {
  const { profileImageUrl, name, breed, age, gender, specialNote } = data;
  return (
    <section className={styles.container}>
      <div className={styles.aniCard}>
        <Image
          className={styles.image}
          src={profileImageUrl || '/images/DefaultAnimal.png'}
          width={48}
          height={48}
          alt={name}
        />
        <div>
          <Body4>{name}</Body4>
          <Caption1 color="gray600">
            {breed && breed + ', '}
            {age && age + ', '}
            {gender && ANIMAL_GENDER_DICT[gender]}
            &nbsp;
          </Caption1>
        </div>
      </div>
      <hr className={styles.divider} />

      {mode === 'edit' && onClickEdit && onClickDelete ? (
        <Caption1 element={'p'} className={styles.textClamp} color="gray600">
          {specialNote}
        </Caption1>
      ) : (
        <Caption1 element={'p'} className={styles.textFull} color="gray600">
          {specialNote}
        </Caption1>
      )}

      {/* mode, clickEdit, clickDelete 모두 확인 */}
      {mode === 'edit' && onClickEdit && onClickDelete && (
        <div className={styles.buttonWarp}>
          <Button
            variant="line"
            size="xsmall"
            width="61px"
            onClick={onClickEdit}
          >
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
      )}
    </section>
  );
}
