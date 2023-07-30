import api from '@/api/instance';
import { ShelterStatus, MyStatus } from '@/constants/volunteerEvent';
import { parsingFilter } from '@/utils/parsingFilter';

export const queryKey = {
  all: ['mypage-event'] as const
};

export interface MypageEvent {
  pageNumber: number;
  pageSize: number;
  content: MyShelterEvent[] | MyVolunteerEvent[];
}

export interface MyBaseEvent {
  volunteerEventId: number;
  title: string;
  category: string;
  eventStatus: string;
  startAt: string;
  endAt: string;
}

export interface MyShelterEvent extends MyBaseEvent {
  eventStatus: ShelterStatus;
  recruitNum: number;
  participantNum: number;
  waitingNum: number;
}

export interface MyVolunteerEvent extends MyBaseEvent {
  myParticipationStatus: MyStatus;
  name: string;
  profileImageUrl: string;
}

export interface MypageEventParams {
  page?: number;
  status?: ShelterStatus;
}

export const getMyEvent = async (filter: MypageEventParams) => {
  const queryParameters = parsingFilter(filter);

  const response = await api
    .get(`shelter/admin/my/volunteer-event${queryParameters}`)
    .then(res => res.json<MypageEvent>());
  return response;
};
