import CompleteSheet from '@/components/global/Complete/CompleteSheet';
import { OnNextProps } from '../page';

export default function RequireComplete({ onNext }: OnNextProps) {
  return (
    <CompleteSheet
      message="필수 정보 입력이 <br/>완료되었어요!"
      onClick={onNext}
      buttonTitle="다음"
    />
  );
}
