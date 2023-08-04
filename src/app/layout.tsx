import QueryProvider from '@/providers/QueryProvider';
import RecoilRootWrapper from '@/providers/RecoilRootWrapper';
import font from '@/styles/font';
import '@/styles/global.css';
import * as styles from './layout.css';
import { GlobalComponents } from '@/components/global/GlobalComponents/GlobalComponents';
import ServerSideHeader from '@/components/common/Header/ServerSideHeader';
import { AuthProvider } from '@/providers/AuthContext';
import Footer from '@/components/common/Footer/Footer';
import ScrollToTop from '@/components/global/ScrollToTop/ScrollToTop';
import { PORTAL_ELEMENT_ID } from '@/components/global/Dialog/Portal/types';

export const metadata = {
  title: '댕글댕글',
  description: '더 나은 세상을 만들어봐요',
  openGraph: {
    images: ['/images/DangleShare.png']
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={font.className}>
      <body className={styles.container}>
        <RecoilRootWrapper>
          <QueryProvider>
            <AuthProvider>
              <div id={PORTAL_ELEMENT_ID.modal} />
              <GlobalComponents />
              <ServerSideHeader />
              <ScrollToTop>
                <main className={styles.main}>{children}</main>
              </ScrollToTop>
              <Footer />
              <div id={PORTAL_ELEMENT_ID.bottom} />
            </AuthProvider>
          </QueryProvider>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
