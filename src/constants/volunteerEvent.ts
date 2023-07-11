import { ChipOption } from '@/components/common/ChipInput/ChipInput';
import createInputOptions from '@/utils/createInputOptions';

export const VOLUNTEER_EVENT_CATEGORY = {
  WALKING: '산책 봉사',
  SHELTER_CLEANING: '견사 청소',
  MOVING: '이동 봉사',
  PROMOTION: '홍보물 제작',
  ETC: '기타'
} as const;
export type VolunteerEventCategory = keyof typeof VOLUNTEER_EVENT_CATEGORY;
export const CATEGORY_OPTIONS: ChipOption[] = createInputOptions(
  VOLUNTEER_EVENT_CATEGORY
);

export const ITERATION_CYCLE = {
  EVERYDAY: '매일',
  WEEKLY: '매주',
  BIWEEKLY: '격주',
  MONTHLY: '매월'
};
export type IterationCycle = keyof typeof ITERATION_CYCLE;
export const ITERATION_CYCLE_OPTIONS: ChipOption[] =
  createInputOptions(ITERATION_CYCLE);

export const AGE_LIMIT = {
  ADULT: '성인만',
  HIGH: '고등 이상',
  MIDDLE: '중등 이상',
  ELEMENTARY: '초등 이상',
  NONE: '제한 없음'
};
export type AgeLimit = keyof typeof VOLUNTEER_EVENT_CATEGORY;
export const AGE_LIMIT_OPTIONS: ChipOption[] = createInputOptions(
  VOLUNTEER_EVENT_CATEGORY
);
