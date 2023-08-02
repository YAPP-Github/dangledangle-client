'use client';
import { ShelterInfo } from '@/api/mypage/bookmark/bookmark';
import useBookmarkList from '@/api/mypage/bookmark/useBookmarkList';
import BookmarkCard from '@/components/mypage/BookmarkCard/BookmarkCard';
import useHeader from '@/hooks/useHeader';
import { palette } from '@/styles/color';
import uuidv4 from '@/utils/uuidv4';
import * as styles from './styles.css';

export default function Bookmark() {
  useHeader({ color: palette.white, title: '즐겨찾기 설정' });
  const { data: bookmarks } = useBookmarkList();

  return (
    <main className={styles.contianer}>
      {bookmarks?.shelters?.map((bookmark: ShelterInfo) => (
        <BookmarkCard key={uuidv4()} bookmark={bookmark} />
      ))}
    </main>
  );
}
