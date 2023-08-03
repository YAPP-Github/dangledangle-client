import MyVolEventPage from '@/components/mypage/EventHistory/MyVolEventPage';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { cookies } from 'next/headers';

export default function VolunteerHistoryPage() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';
  const { dangle_role: role } = decodeDangleToken(accessToken);
  return <MyVolEventPage dangle_role={role} />;
}
