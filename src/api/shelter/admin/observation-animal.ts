import { ObservationAnimal } from '@/types/shelter';
import api from '../../instance';

export interface ObservationAnimalPayload
  extends Omit<ObservationAnimal, 'profileImageUrl' | 'id'> {
  images: string[];
}

export type PostResponse = {
  observationAnimalId: number;
};
export type PutResponse = PostResponse;
export type DeleteResponse = PostResponse;

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
      json: data
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
      json: data
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
