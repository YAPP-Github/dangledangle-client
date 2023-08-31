import api from '@/api/instance';
import { ShelterStatus, MyStatus } from '@/constants/volunteerEvent';
import { parsingFilter } from '@/utils/parsingFilter';

export const queryKey = {
  all: ['volunteer-event', 'admin'] as const
};

export interface MypageEvent<T extends MyShelterEvent | MyVolunteerEvent> {
  pageNumber: number;
  pageSize: number;
  content: T[];
}

export interface MyBaseEvent {
  volunteerEventId: number;
  title: string;
  category: string;
  eventStatus: ShelterStatus;
  startAt: string;
  endAt: string;
  recruitNum: number;
  participantNum: number;
  waitingNum: number;
}

export interface MyShelterEvent extends MyBaseEvent {}

export interface MyVolunteerEvent extends MyBaseEvent {
  shelterId: number;
  shelterName: string;
  shelterImageProfileUrl: string;
  myParticipationStatus: MyStatus;
}

export interface MypageEventParams {
  page?: number;
  status?: ShelterStatus | MyStatus;
}

export const getMyShelterEvent = async (filter: MypageEventParams) => {
  const queryParameters = parsingFilter(filter);

  const response = await api
    .get(`shelter/admin/my/volunteer-event${queryParameters}`)
    .then(res => res.json<MypageEvent<MyShelterEvent>>());
  return response;
};

export const getMyVolEvent = async (filter: MypageEventParams) => {
  const queryParameters = parsingFilter(filter);

  const response = await api
    .get(`volunteer/my/volunteer-event${queryParameters}`)
    .then(res => res.json<MypageEvent<MyVolunteerEvent>>());
  return response;
};
