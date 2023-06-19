'use client';
import TermsOfUserAcceptModal from '@/components/volunteer/TermsOfUserAcceptModal/TermsOfUserAcceptModal';
import { headerState } from '@/store/header';
import { useRouter } from 'next/navigation';
import { useLayoutEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

export default function Register() {
  const router = useRouter();
  const setHeader = useSetRecoilState(headerState);
  const [isOpened, setIsOpend] = useState(false);
  useLayoutEffect(() => {
    setHeader({
      title: '개인봉사자로 시작하기',
      thisPage: null,
      entirePage: null
    });
    setIsOpend(true);
  }, []);
  return (
    <TermsOfUserAcceptModal
      isOpened={isOpened}
      onNext={() => {
        router.push('/volunteer/register/step1');
      }}
    />
  );
}
