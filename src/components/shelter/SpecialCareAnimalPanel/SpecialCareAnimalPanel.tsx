'use client';
import AnimalCard from '@/components/shelter-edit/AnimalCard/AnimalCard';
import { animalsMock } from '@/types/shelter';
import * as styles from './SpecialCareAnimalPanel.css';
import { H4 } from '@/components/common/Typography';

export default function SpecialCareAnimalPanel() {
  return (
    <>
      <section className={styles.panelWrapper}>
        <H4>특별 케어 동물 정보</H4>
        {animalsMock.map(animal => (
          <div key={animal.id}>
            <AnimalCard data={animal} />
          </div>
        ))}
      </section>
    </>
  );
}
