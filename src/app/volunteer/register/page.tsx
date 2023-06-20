import TermsOfUserAcceptModal from '@/components/volunteer/TermsOfUserAcceptModal/TermsOfUserAcceptModal';
import { headers } from 'next/headers';
export default function Register({}) {
  const header = headers();

  console.log('register', header);

  console.log(header.keys());
  return (
    <>
      <TermsOfUserAcceptModal />
    </>
  );
}
