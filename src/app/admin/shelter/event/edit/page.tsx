'use client';

import ChipInput from '@/components/common/ChipInput/ChipInput';
import { Caption1 } from '@/components/common/Typography';
import {
  AGE_LIMIT_OPTIONS,
  CATEGORY_OPTIONS,
  CYCLE_OPTIONS
} from '@/constants/volunteerEvent';
import { useState } from 'react';
import * as styles from './styles.css';

type ChipValues = {
  category: string;
  cycle: string;
  ageLimit: string;
};

export default function ShelterEventEditPage() {
  const [chipInput, setChipInput] = useState<ChipValues>({
    category: CATEGORY_OPTIONS[0],
    cycle: CYCLE_OPTIONS[0].value,
    ageLimit: AGE_LIMIT_OPTIONS[0].value
  });

  const handleChipInput = (name: string, value: string) => {
    setChipInput({ ...chipInput, [name]: value });
  };

  return (
    <form className={styles.form}>
      <div>
        <Caption1
          className={styles.label}
          element={'label'}
          htmlFor="cateogry"
          color="gray600"
        >
          카테고리
        </Caption1>
        <ChipInput
          name="category"
          value={chipInput.category}
          options={CATEGORY_OPTIONS}
          onChange={handleChipInput}
        />
      </div>
      <div>
        <Caption1
          className={styles.label}
          element={'label'}
          htmlFor="cycle"
          color="gray600"
        >
          반복주기
        </Caption1>
        <ChipInput
          name="cycle"
          value={chipInput.cycle}
          options={CYCLE_OPTIONS}
          onChange={handleChipInput}
        />
      </div>
      <div>
        <Caption1
          className={styles.label}
          element={'label'}
          htmlFor="ageLimit"
          color="gray600"
        >
          연령 조건
        </Caption1>
        <ChipInput
          name="ageLimit"
          value={chipInput.ageLimit}
          options={AGE_LIMIT_OPTIONS}
          onChange={handleChipInput}
        />
      </div>
    </form>
  );
}
