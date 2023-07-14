import api from '@/api/instance';

interface address {
  address: string;
  addressDetail: string;
  postalCode: string;
  latitude: number;
  longitude: number;
}

export interface VolunteerEvent {
  shelterName: string;
  shelterProfileImageUrl: string;
  title: string;
  recruitNum: number;
  address: address;
  description: string;
  ageLimit: 'NONE' | 'ELEMENTARY' | 'MIDDLE' | 'HIGH' | 'ADULT';
  category: 'WALKING' | 'PROMOTION' | 'SHELTER_CLEANING' | 'MOVING' | 'ETC';
  eventStatus: 'IN_PROGRESS' | 'DONE' | 'CLOSED';
  myParticipationStatus: 'JOINING' | 'WAITING' | 'NONE';
  startAt: Date;
  endAt: Date;
  joiningVolunteers: string[];
  waitingVolunteers: string[];
}

export interface VolEventJoin {
  type: 'JOINING' | 'WAITING' | 'NONE';
  volunteerEventId: number;
}

export interface VolEventWithdraw {
  volunteerId: number;
  volunteerEventId: number;
}

export const get = async (shelterId: number, volunteerEventId: number) => {
  const response = await api
    .get(`shelter/${shelterId}/volunteer-event/${volunteerEventId}`)
    .then(res => res.json<VolunteerEvent>());
  return response;
};

export const participate = async (
  shelterId: number,
  volunteerEventId: number
) => {
  const response = await api
    .post(
      `shelter/${shelterId}/volunteer-event/${volunteerEventId}/participate`
    )
    .then(res => res.json<VolEventJoin>());
  return response;
};

export const withdraw = async (shelterId: number, volunteerEventId: number) => {
  const response = await api
    .delete(`shelter/${shelterId}/volunteer-event/${volunteerEventId}/withdraw`)
    .then(res => res.json<VolEventWithdraw>());
  return response;
};
