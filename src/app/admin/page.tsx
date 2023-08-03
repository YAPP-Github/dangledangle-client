import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { cookies } from 'next/headers';
import MyPageMain from '../../components/mypage/MyPageMain/MyPageMain';

interface pageProps {}

export default function AdminMyPage({}: pageProps) {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';
  const { dangle_role: role } = decodeDangleToken(accessToken);
  return (
    <>
      <MyPageMain dangle_role={role} />
    </>
  );
}
