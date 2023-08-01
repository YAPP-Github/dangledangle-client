import Unregister from '@/components/unregister/Unregister';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import { UserRole } from '@/constants/user';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { cookies } from 'next/headers';

export default function UnregisterPage() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';
  const { dangle_role: role } = decodeDangleToken(accessToken);

  return <Unregister role={role as UserRole} />;
}
