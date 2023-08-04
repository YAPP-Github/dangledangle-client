import ScrollToTop from '@/components/global/ScrollToTop/ScrollToTop';
import { PropsWithChildren } from 'react';

export default function MainWrapper({ children }: PropsWithChildren) {
  return <ScrollToTop>{children}</ScrollToTop>;
}
