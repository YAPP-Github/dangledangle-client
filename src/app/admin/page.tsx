import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { cookies } from 'next/headers';
import MyPageMain from '../../components/mypage/MyPageMain/MyPageMain';
import ToggleSection from '@/components/mypage/MyPageMain/ToggleSection';
import MyPageHistory from '@/components/mypage/MyPageMain/MyPageHistory';
import * as styles from './styles.css';
import getQueryClient from '@/providers/getQueryClient';
import { getShelterInfo, getVolInfo, queryKey } from '@/api/mypage/mypage';
import { dehydrate } from '@tanstack/query-core';
import Hydrate from '@/providers/Hydrate';

export default async function AdminMyPage() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';
  const { dangle_role: role } = decodeDangleToken(accessToken);
  const isShelterRole = role === 'SHELTER' ? true : false;
  const headerOption = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const fetchData = async () => {
    if (role === 'SHELTER') {
      return await getShelterInfo(headerOption);
    } else {
      return await getVolInfo(headerOption);
    }
  };

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(queryKey.all, fetchData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={styles.wrapper}>
      <Hydrate state={dehydratedState}>
        <MyPageHistory isShelterRole={isShelterRole} dangle_role={role} />
        <ToggleSection isShelterRole={isShelterRole} dangle_role={role} />
        <MyPageMain isShelterRole={isShelterRole} dangle_role={role} />
      </Hydrate>
    </div>
  );
}
