import {
  AgeLimit,
  MyStatus,
  VolunteerEventCategory
} from '@/constants/volunteerEvent';
import { ShelterAddress } from './shelter';

export type EventStatus = 'IN_PROGRESS' | 'DONE' | 'CANCELED';

export interface VolunteerEvent {
  volunteerEventId: number;
  eventStatus: EventStatus;
  category: VolunteerEventCategory;
  title: string;
  recruitNum: number;
  joiningNum: number;
  waitingNum: number;
  startAt: string;
  endAt: string;
  myParticipationStatus: MyStatus;
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
}
