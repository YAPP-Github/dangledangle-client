import api from '../instance';

export const queryKey = {
  all: ['mypage-info'] as const
};

export interface MyVolInfo {
  nickName: string;
  historyStat: VolInfo;
  phoneNumber: string;
  alarmEnabled: boolean;
}

export interface MyShelterInfo {
  name: string;
  historyStat: ShleterInfo;
  alarmEnabled: boolean;
}

export interface VolInfo {
  done: number;
  waiting: number;
  joining: number;
}

export interface ShleterInfo {
  done: number;
  inProgress: number;
}

export interface BasePayload {
  alarmEnabled: boolean;
}
export interface VolInfoPayload extends BasePayload {
  nickName: string;
  phoneNumber: string;
}

export interface VolResponse {
  volunteerId: number;
}

export interface ShelterResponse {
  shelterId: number;
}

export const getVolInfo = async () => {
  const response = await api
    .get(`volunteer/my`)
    .then(res => res.json<MyVolInfo>());
  return response;
};

export const getShelterInfo = async () => {
  const response = await api
    .get(`shelter/admin/my`)
    .then(res => res.json<MyShelterInfo>());
  return response;
};

export const logout = async () => {
  const response = await api.get(`auth/logout`).then(res => res.json<string>());
  return response;
};

export const postMyVolInfo = async (data: VolInfoPayload) => {
  const response = await api
    .put(`volunteer/my`, {
      json: data
    })
    .then(res => res.json<VolResponse>());
  return response;
};

export const postShelterAlarm = async (data: BasePayload) => {
  const response = await api
    .put(`shelter/admin/alarm`, {
      json: data
    })
    .then(res => res.json<ShelterResponse>());
  return response;
};
