import api from '@/api/instance';
import {
  AgeLimit,
  IterationCycle,
  VolunteerEventCategory
} from '@/constants/volunteerEvent';

export type VolunteerEventPayload = {
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
};

export type PostResponse = {
  volunteerEventsId: number[];
};
export const post = async (payload: VolunteerEventPayload) => {
  return await api
    .post('/shelter/admin/volunteer-event', {
      json: payload
    })
    .json<PostResponse>();
};

export type PutResponse = {
  volunteerEventId: number;
};
export const put = async (id: number, payload: VolunteerEventPayload) => {
  return await api
    .put(`/shelter/admin/volunteer-event/${id}`, {
      json: payload
    })
    .json<PutResponse>();
};

export type DeleteResponse = {
  volunteerEventId: number;
};
export const remove = async (id: number) => {
  return await api
    .delete(`/shelter/admin/volunteer-event/${id}`)
    .json<DeleteResponse>();
};
