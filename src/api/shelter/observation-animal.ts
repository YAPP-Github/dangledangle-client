import { AnimalGender } from '@/constants/animal';
import api from '../instance';

export interface ObservationAnimal extends ObservationAnimalPayload {
  id: number;
}

export interface ObservationAnimalPayload {
  profileImageUrl: string;
  name: string;
  age: number;
  gender: AnimalGender;
  breed: string;
  specialNote: string;
}

export type PostResponse = {
  observationAnimalId: number;
};
export type PutResponse = PostResponse;
export type DeleteResponse = PostResponse;

export const mock: ObservationAnimal[] = [
  {
    id: 0,
    profileImageUrl: '',
    name: '인절미',
    breed: '비글',
    age: 3,
    gender: 'FEMALE',
    specialNote:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  },
  {
    id: 1,
    profileImageUrl: '',
    name: '홍시',
    breed: '비글',
    age: 3,
    gender: 'MALE',
    specialNote:
      '성인 남성을 무서워하는 아이입니다. !#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생!#$%에 주의해주세요. 상세 주의사항은 여기서는 최대 두줄까지 보입니다. 길어지면 생'
  }
];

export const get = async (observationAnimalId: number) => {
  const response = await api
    .get(`shelter/admin/observation-animal/${observationAnimalId}`)
    .then(res => res.json<ObservationAnimal>());
  return response;
};

export const getAll = async () => {
  const response = await api
    .get('shelter/admin/observation-animal')
    .then(res => res.json<ObservationAnimal[]>());
  return response;
};

export const post = async (data: ObservationAnimalPayload) => {
  const response = await api
    .post(`shelter/admin/observation-animal`, {
      body: JSON.stringify(data)
    })
    .then(res => res.json<PostResponse>());

  return response;
};

export const put = async (
  observationAnimalId: number,
  data: ObservationAnimalPayload
) => {
  const response = await api
    .put(`shelter/admin/observation-animal/${observationAnimalId}`, {
      body: JSON.stringify(data)
    })
    .then(res => res.json<PutResponse>());

  return response;
};

export const remove = async (observationAnimalId: number) => {
  const response = await api
    .delete(`shelter/admin/observation-animal/${observationAnimalId}`)
    .then(res => res.json<DeleteResponse>());

  return response;
};
