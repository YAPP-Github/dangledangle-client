import Footer from '@/components/common/Footer/Footer';
import ServerSideHeader from '@/components/common/Header/ServerSideHeader';
import { PORTAL_ELEMENT_ID } from '@/components/global/Dialog/Portal/types';
import { GlobalComponents } from '@/components/global/GlobalComponents/GlobalComponents';
import { AuthProvider } from '@/providers/AuthContext';
import MainWrapper from '@/providers/MainWrapper';
import QueryProvider from '@/providers/QueryProvider';
import RecoilRootWrapper from '@/providers/RecoilRootWrapper';
import font from '@/styles/font';
import '@/styles/global.css';
import * as styles from './layout.css';

export const metadata = {
  metadataBase: new URL('https://dangledangle.vercel.app'),
  title: '댕글댕글',
  description: '더 나은 세상을 만들어봐요!',
  openGraph: {
    title: '댕글댕글',
    description: '더 나은 세상을 만들어봐요!',
    url: 'https://dangledangle.vercel.app',
    images: [
      {
        url: '/images/DangleShare.png',
        width: 380,
        height: 270,
        alt: '댕글댕글'
      }
    ]
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
              <MainWrapper>
                <main className={styles.main}>{children}</main>
              </MainWrapper>
              <Footer />
              <div id={PORTAL_ELEMENT_ID.bottom} />
            </AuthProvider>
          </QueryProvider>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
