import {
  AgeLimit,
  IterationCycle,
  VolunteerEventCategory
} from '@/constants/volunteerEvent';

export interface VolunteerEventPayload {
  title: string;
  recruitNum: number;
  description: string;
  category: VolunteerEventCategory;
  ageLimit: AgeLimit;
  startAt: string; // yyyy-MM-dd HH:mm:ss
  endAt: string; // yyyy-MM-dd HH:mm:ss
  iteration: {
    iterationCycle: IterationCycle;
    iterationEndAt: string; //yyyy-MM-dd
  };
}
