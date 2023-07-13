import { VolunteerEventCategory } from '@/constants/volunteerEvent';

export type EventStatus = 'IN_PROGRESS' | 'DONE' | 'CANCELED';
export type MyParticipationStatus = 'PARTICIPATING' | 'WAITING' | 'NONE';

export interface VolunteerEvent {
  volunteerEventId: number;
  eventStatus: EventStatus;
  category: VolunteerEventCategory;
  title: string;
  recruitNum: number;
  joinNum: number;
  waitingNum: number;
  startAt: string;
  endAt: string;
  myParticipationStatus?: MyParticipationStatus;
}
