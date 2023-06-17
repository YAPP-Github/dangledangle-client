'use client';

import { useQuery } from '@tanstack/react-query';
import { getDatas } from './HydratedDatas';

export default function Test() {
  // network탭 확인해보았을 때 클라이언트 상에서는
  // API 요청이 없음에도 데이터를 가져온 것 확인 가능합니다.

  // CSR 방식은 기본 react query 방식과 동일하게 사용하면 됩니다.

  const { data } = useQuery({
    queryKey: ['test'],
    queryFn: getDatas
  });
  console.log(data);
  return <div>react query SSR fetching Text</div>;
}
