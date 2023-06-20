import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { shelterKey } from '../../queryKey';
import { ShelterInfo, get } from '.';

export default function useShelterInfo(options?: UseQueryOptions<ShelterInfo>) {
  return useQuery<ShelterInfo>(shelterKey.info(), () => get(), {
    ...options
  });
}
