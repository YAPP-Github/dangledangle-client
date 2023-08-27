import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import {
  MyShelterInfo,
  MyVolInfo,
  getShelterInfo,
  getVolInfo,
  queryKey
} from './mypage';

export default function useMyInfo(
  role: string,
  options?: UseQueryOptions<MyVolInfo | MyShelterInfo>
) {
  const fetchData = async () => {
    if (role === 'SHELTER') {
      return await getShelterInfo();
    } else {
      return await getVolInfo();
    }
  };

  return useQuery<MyVolInfo | MyShelterInfo>(queryKey.all, fetchData, {
    ...options,
    onError(err) {
      console.log(err);
    }
  });
}
