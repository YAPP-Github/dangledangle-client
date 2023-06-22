import CompleteSheet from '@/components/global/Complete/CompleteSheet';
import { useRouter } from 'next/navigation';

export default function RegisterComplete() {
  const router = useRouter();
  return (
    <CompleteSheet
      message="가입 완료!<br/>같이 세상을 바꿔볼까요?"
      onClick={() => router.push('/event')}
      buttonTitle="홈 살펴보러 가기"
    />
  );
}
