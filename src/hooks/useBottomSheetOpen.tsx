import { useState } from 'react';

export default function useBottomSheetOpen() {
  const [isSheetOpened, setIsSheetOpened] = useState(false);

  const handleSheetOpen = () => setIsSheetOpened(true);
  const handleSheetClose = () => setIsSheetOpened(false);

  return { isSheetOpened, handleSheetOpen, handleSheetClose };
}
