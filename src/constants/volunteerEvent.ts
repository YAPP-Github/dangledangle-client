import { ChipOption } from '@/components/common/ChipInput/ChipInput';

export const CATEGORY_OPTIONS = [
  '산책 봉사',
  '견사 청소',
  '이동 봉사',
  '홍보물 제장'
];
export const CYCLE_OPTIONS: ChipOption[] = [
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

export const AGE_LIMIT_OPTIONS: ChipOption[] = [
  {
    label: '성인만',
    value: 'adult'
  },
  {
    label: '고등 이상',
    value: 'high'
  },
  {
    label: '중등 이상',
    value: 'middle'
  },
  {
    label: '초등 이상',
    value: 'elementary'
  },
  {
    label: '제한 없음',
    value: 'none'
  }
];
