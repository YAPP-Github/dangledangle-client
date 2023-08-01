'use client';
import { ShelterInfo } from '@/api/mypage/bookmark/bookmark';
import useDeleteBookmark from '@/api/mypage/bookmark/useDeleteBookmark';
import { Star } from '@/asset/icons';
import Avartar from '@/components/common/Avartar/Avartar';
import { Body3 } from '@/components/common/Typography';
import useToast from '@/hooks/useToast';
import { useCallback } from 'react';
import * as styles from './BookmarkCard.css';
import Link from 'next/link';

interface BookmarkCardProps {
  bookmark: ShelterInfo;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const toastOn = useToast();
  const { name, shelterId } = bookmark;
  const { mutateAsync } = useDeleteBookmark();
  const handleBookmark = useCallback(() => {
    mutateAsync(shelterId).then(res =>
      toastOn(`${name}가 즐겨찾기에서 삭제되었습니다.`)
    );
  }, [mutateAsync, name, shelterId, toastOn]);

  return (
    <div className={styles.container}>
      <div style={{ flexGrow: 1 }}>
        <Link href={`/shelter/${shelterId}`}>
          <div className={styles.avartar}>
            <Avartar
              size="40"
              defaultImage="shelter"
              shape="circle"
              alt={`${shelterId}의 프로필 이미지`}
              // imagePath={profileImageUrl}
            ></Avartar>
            <Body3>{name}</Body3>
          </div>
        </Link>
      </div>
      <span className={styles.star} onClick={handleBookmark}>
        <Star />
      </span>
    </div>
  );
}
