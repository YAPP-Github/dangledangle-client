'use client';
import useToast from '@/hooks/useToast';
import * as styles from './VolunteerFavoriteButtons.css';
import Button from '@/components/common/Button/Button';
import { use } from 'react';
import { post } from '@/api/shelter/{shelterId}/bookmark';

const mockData = { isFavorited: true };

async function fetchData() {
  const res = new Promise<typeof mockData>(resolve =>
    setTimeout(() => resolve(mockData), 0)
  );
  return res;
}

// 하나의 promse Ref를 갖기 위해, 변수에 할당하여 use() hook으로 전달.
const dataPromise = fetchData();

interface VolunteerFavoriteButtonsProps {
  shelterId: number;
  bankAccount?: {
    accountNumber: string;
    bankName: string;
  } | null;
}
export default function VolunteerFavoriteButtons({
  shelterId,
  bankAccount
}: VolunteerFavoriteButtonsProps) {
  const toast = useToast();

  // TODO: 보호소 즐겨찾기 정보 가져오기
  const { isFavorited } = use(dataPromise);

  // TODO : 즐겨찾기 추가/삭제 API 적용
  const handleFavoriteClick = async () => {
    if (isFavorited) {
      await post(shelterId);
    }
    toast('즐겨찾기가 추가되었습니다.');
  };

  const handleDonationClick = () => {
    if (bankAccount) {
      navigator.clipboard.writeText(
        `${bankAccount.bankName} ${bankAccount.accountNumber}`
      );
      toast('후원 계좌번호가 복사되었습니다.');
    } else {
      toast('보호소에서 후원 계좌를 등록하지 않았습니다.');
    }
  };

  return (
    <div className={styles.buttons}>
      <Button
        buttonColor="secondary"
        size="small"
        onClick={handleFavoriteClick}
        variant={isFavorited ? 'filled' : 'line'}
        color={isFavorited ? 'white' : 'secondary'}
      >
        {isFavorited ? '즐겨찾기' : '즐겨찾기 해제'}
      </Button>
      <Button
        buttonColor="secondary"
        size="small"
        variant="line"
        color="white"
        onClick={handleDonationClick}
      >
        간편후원
      </Button>
    </div>
  );
}
