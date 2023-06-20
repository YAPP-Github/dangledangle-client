import TermsOfUserAcceptModal from '@/components/volunteer/TermsOfUserAcceptModal/TermsOfUserAcceptModal';
import { headers } from 'next/headers';
export default function Register({}) {
  const header = headers();

  // TODO
  // 브라우저 url 입력으로 register 페이지 접근 못하도록 수정
  console.log('register', header);
  console.log(header.keys());
  return (
    <>
      <TermsOfUserAcceptModal />
    </>
  );
}
