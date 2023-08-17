import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { cookies } from 'next/headers';
import MyShelterEventPage from './MyShelterEventPage';

export default function ShelterHistoryPage() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';
  const { dangle_role: role } = decodeDangleToken(accessToken);

  return <MyShelterEventPage dangle_role={role} />;
}
