import ErrorModal from '@/components/volunteer/ErrorModal/ErrorModal';
import KakaoLogin from '@/components/volunteer/KakaoLoginButton/KakaoLogin';
import MarqueeTitle from '@/components/volunteer/MarqeeTitle/MarqueeTitle';
import { headers } from 'next/headers';

export default function VolunteerLogin({}) {
  const header = headers();
  const referer = header.get('referer');

  /**
   * voluter/redirect에서 오는 경우 에러처리
   * (isMember == true , accessToken && refreshToken == false 인 경우
   */
  const error = Boolean(referer && referer.match('volunteer/redirect'));

  return (
    <div>
      <MarqueeTitle />
      <KakaoLogin />
      <ErrorModal error={error} />
    </div>
  );
}
