import KakaoLogin from '@/components/volunteer/KakaoLoginButton/KakaoLogin';
import MarqueeTitle from '@/components/volunteer/MarqeeTitle/MarqueeTitle';
import TermsOfUserAcceptModal from '@/components/volunteer/TermsOfUserAcceptModal/TermsOfUserAcceptModal';

export default function VolunteerLogin() {
  return (
    <div>
      <MarqueeTitle />
      <KakaoLogin />
      <TermsOfUserAcceptModal isOpened />
    </div>
  );
}
