'use client';
import useToast from '@/hooks/useToast';
import * as styles from './VolunteerFavoriteButtons.css';
import Button from '@/components/common/Button/Button';
import useBookMarkMutation from '@/api/shelter/{shelterId}/useBookMarkMutation';
import { useCallback } from 'react';

interface VolunteerFavoriteButtonsProps {
  shelterId: number;
  bookMarked?: boolean;
  bankAccount?: {
    accountNumber: string;
    bankName: string;
  } | null;
}
export default function VolunteerFavoriteButtons({
  shelterId,
  bookMarked,
  bankAccount
}: VolunteerFavoriteButtonsProps) {
  const toast = useToast();
  console.log('buttons', bookMarked);

  const bookMarkMessage = useCallback((bookMarkState: boolean) => {
    if (bookMarkState) {
      toast('즐겨찾기에 추가되었습니다.');
    } else {
      toast('즐겨찾기가 삭제되었습니다');
    }
  }, []);

  const { mutate } = useBookMarkMutation(shelterId, bookMarkMessage);

  const handleFavoriteClick = async () => {
    mutate(shelterId);
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
        variant={bookMarked ? 'line' : 'filled'}
        color={bookMarked ? 'secondary' : 'white'}
      >
        {bookMarked ? '즐겨찾기 해제' : '즐겨찾기'}
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
