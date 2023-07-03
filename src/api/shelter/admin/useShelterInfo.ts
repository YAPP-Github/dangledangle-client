import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { shelterKey } from '../../queryKey';
import { get } from '.';
import { ShelterInfo } from '@/types/shelter';

export default function useShelterInfo(options?: UseQueryOptions<ShelterInfo>) {
  return useQuery<ShelterInfo>(shelterKey.info(), () => get(), {
    ...options
  });
}
