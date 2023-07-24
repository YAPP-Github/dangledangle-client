'use client';
import ChipInput, { ChipOption } from '@/components/common/ChipInput/ChipInput';
import { useMemo, useState } from 'react';

type ChipValues = {
  category: string;
  cycle: string;
  ageCondition: string;
};

// 라벨과 value가 동일한 옵션
const CATEGORY_OPTIONS = ['산책 봉사', '견사 청소', '이동 봉사', '홍보물 제장'];

// 라벨과 value가 다른 옵션
const CYCLE_OPTIONS: ChipOption[] = [
  {
    label: '반복 안함',
    value: 'none'
  },
  {
    label: '매일',
    value: 'everyday'
  },
  {
    label: '매주',
    value: 'everyweek'
  }
];

export default function ChipInputExample() {
  // useForm 사용 안함
  const [chipInput, setChipInput] = useState<ChipValues>({
    category: '',
    cycle: 'none',
    ageCondition: ''
  });

  const handleChipInput = (name: string, value: string) => {
    setChipInput({ ...chipInput, [name]: value });
  };

  const submittable = useMemo(() => {
    return !Object.values(chipInput).includes('');
    // && isEmpty(errors)  // useForm과 함께 사용할 경우
  }, []);

  return (
    <div>
      <ChipInput
        style={{ marginBottom: '30px' }}
        name="category"
        value={chipInput.category}
        options={CATEGORY_OPTIONS}
        onChange={handleChipInput}
      />
      <ChipInput
        name="cycle"
        value={chipInput.cycle}
        options={CYCLE_OPTIONS}
        onChange={handleChipInput}
      />
    </div>
  );
}
