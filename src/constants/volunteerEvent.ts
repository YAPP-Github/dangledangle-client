import { ChipOption } from '@/components/common/ChipInput/ChipInput';
import { FilterOption } from '@/components/common/Filter/Filter';
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
export const ITERATION_CYCLE_OPTIONS: ChipOption[] = [
  {
    label: '반복 안함',
    value: ''
  },
  ...createInputOptions(ITERATION_CYCLE)
];
export const NUM_OF_MAX_ITERATION_MONTHS = 6;

export const AGE_LIMIT = {
  ADULT: '성인만',
  HIGH: '고등 이상',
  MIDDLE: '중등 이상',
  ELEMENTARY: '초등 이상',
  NONE: '제한 없음'
};
export type AgeLimit = keyof typeof AGE_LIMIT;
export const AGE_LIMIT_OPTIONS: ChipOption[] = createInputOptions(AGE_LIMIT);

export const REGION_OPTIONS = [
  '서울',
  '경기도',
  '인천',
  '대전',
  '강원도',
  '대구',
  '경상도',
  '전라도',
  '충청도',
  '제주도'
] as const;

export type RegionOptions = (typeof REGION_OPTIONS)[number];

const EVENT_STATUS_FILTER = {
  IN_PROGRESS: '모집 중',
  DONE: '모집 종료'
};

export const EVENT_STATUS_FILTER_OPTIONS: FilterOption[] = createInputOptions({
  all: '전체',
  ...EVENT_STATUS_FILTER
});

export const MY_STATUS = {
  NONE: '미참여',
  JOINING: '신청 완료',
  WAITING: '신청 대기중',
  DONE: '진행 완료'
};
export type MyStatus = keyof typeof MY_STATUS;

export const SHELTER_STATUS = {
  IN_PROGRESS: '모집 진행중',
  CLOSED: '모집 완료',
  DONE: '종료'
};
export type ShelterStatus = keyof typeof SHELTER_STATUS;
