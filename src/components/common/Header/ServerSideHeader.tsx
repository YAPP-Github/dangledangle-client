import { base64ToUtf8 } from '@/utils/base64ToUtf8';
import Header from './Header';
import { cookies, headers } from 'next/headers';
import { X_HEADER_TITLE } from '@/constants/customHttpHeaderKeys';
import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { UserRole } from '@/constants/user';

export default function ServerSideHeader() {
  const headerTitleProps = headers().get(X_HEADER_TITLE) ?? '';
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';
  const { dangle_id, dangle_role: role } = decodeDangleToken(accessToken);
  const prop = JSON.parse(base64ToUtf8(headerTitleProps) || '{}');
  return (
    <Header
      initColor={prop.backgroundColor}
      initTitle={prop.title}
      initRole={role as UserRole}
      shelterId={dangle_id}
    />
  );
}
