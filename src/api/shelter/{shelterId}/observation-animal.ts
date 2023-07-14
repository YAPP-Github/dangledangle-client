import api from '@/api/instance';
import { ObservationAnimal } from '@/types/shelter';

export type ObservationAnimalInfoPayload = { shelterId: number; page: number };

export type ObservationAnimalInfo = {
  pageNumber: number;
  pageSize: number;
  content: ObservationAnimal[];
};

export const get = async ({
  shelterId,
  page
}: ObservationAnimalInfoPayload) => {
  return await api
    .get(`shelter/${shelterId}/observation-animal?page=${page}`)
    .json<ObservationAnimalInfo>();
};
