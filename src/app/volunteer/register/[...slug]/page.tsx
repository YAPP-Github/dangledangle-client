import { COOKIE_REGISTER_EMAIL_KEY } from '@/api/cookieKeys';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterMain from './RegisterMain';
export default function Register({}) {
  // TODO
  // TOU 체크한 부분 서버로 전달하는 로직 필요

  const registerEmail = cookies().get(COOKIE_REGISTER_EMAIL_KEY);

  if (!registerEmail) {
    return redirect('/volunteer/login');
  }

  return (
    <>
      <RegisterMain />
    </>
  );
}
