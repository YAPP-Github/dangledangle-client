import { ChipOption } from '@/components/common/ChipInput/ChipInput';

export const CATEGORY_OPTIONS = [
  { label: '산책 봉사', value: 'WALKING' },
  { label: '견사 청소', value: 'SHELTER_CLEANING' },
  { label: '이동 봉사', value: 'MOVING' },
  { label: '홍보물 제작', value: 'PROMOTION' },
  { label: '기타', value: 'ETC' }
];
export const CYCLE_OPTIONS: ChipOption[] = [
  {
    label: '반복 안함',
    value: ''
  },
  {
    label: '매일',
    value: 'EVERYDAY'
  },
  {
    label: '매주',
    value: 'WEEKLY'
  },
  {
    label: '격주',
    value: 'BIWEEKLY'
  },
  {
    label: '매월',
    value: 'MONTHLY'
  }
];

export const AGE_LIMIT_OPTIONS: ChipOption[] = [
  {
    label: '성인만',
    value: 'ADULT'
  },
  {
    label: '고등 이상',
    value: 'HIGH'
  },
  {
    label: '중등 이상',
    value: 'MIDDLE'
  },
  {
    label: '초등 이상',
    value: 'ELEMENTARY'
  },
  {
    label: '제한 없음',
    value: 'NONE'
  }
];
