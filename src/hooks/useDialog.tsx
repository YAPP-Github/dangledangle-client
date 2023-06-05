import { useState } from 'react';

export default function useDialog() {
  const [isDialog, setDialog] = useState(false);

  const handleDialog = () => setDialog(!isDialog);

  return { isDialog, handleDialog };
}
