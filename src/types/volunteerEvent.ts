import { AgeLimit, VolunteerEventCategory } from '@/constants/volunteerEvent';
import { ShelterAddress } from './shelter';

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
  myParticipationStatus: MyParticipationStatus;
}

export interface VolunteerEventDetail extends Omit<VolunteerEvent, 'joniNum'> {
  shelterName: string;
  shelterProfileImageUrl: string | null;
  description: string;
  address: ShelterAddress;
  joiningVolunteers: string[];
  waitingVolunteers: string[];
  ageLimit: AgeLimit;
}

export interface HomeVolunteerEvent extends VolunteerEvent {
  shelterId: number;
  shelterName: string;
  shelterProfileImageUrl: string | null;
  participantNum: number;
}
