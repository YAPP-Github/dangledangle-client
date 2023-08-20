import { COOKIE_ACCESS_TOKEN_KEY } from '@/constants/cookieKeys';
import decodeDangleToken from '@/utils/token/decodeDangleToken';
import { cookies } from 'next/headers';
import MyPageMain from '../../components/mypage/MyPageMain/MyPageMain';
import ToggleSection from '@/components/mypage/MyPageMain/ToggleSection';
import MyPageHistory from '@/components/mypage/MyPageMain/MyPageHistory';
import * as styles from './styles.css';

export default function AdminMyPage() {
  const accessToken = cookies().get(COOKIE_ACCESS_TOKEN_KEY)?.value || '';
  const { dangle_role: role } = decodeDangleToken(accessToken);
  const isShelterRole = role === 'SHELTER' ? true : false;
  return (
    <div className={styles.wrapper}>
      <MyPageHistory isShelterRole={isShelterRole} dangle_role={role} />
      <ToggleSection isShelterRole={isShelterRole} dangle_role={role} />
      <MyPageMain isShelterRole={isShelterRole} dangle_role={role} />
    </div>
  );
}
