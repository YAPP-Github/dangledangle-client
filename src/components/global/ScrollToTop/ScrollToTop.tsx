'use client';

import { usePathname } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

export default function ScrollToTop({ children }: PropsWithChildren) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
