import TermsOfUserAcceptModal from '@/components/volunteer/TermsOfUserAcceptModal/TermsOfUserAcceptModal';
import { COOKIE_REGISTER_EMAIL_KEY } from '@/constants/cookieKeys';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { VOLUNTEER_REDIRECT_PATH_LOGIN } from './[...slug]/CurrentComponentTypes';
export default function Register() {
  // TODO
  // TOU 체크한 부분 서버로 전달하는 로직 필요

  const registerEmail = cookies().get(COOKIE_REGISTER_EMAIL_KEY);

  if (!registerEmail) {
    return redirect(VOLUNTEER_REDIRECT_PATH_LOGIN);
  }

  return (
    <>
      <TermsOfUserAcceptModal />
    </>
  );
}
