import { base64ToUtf8 } from '@/utils/base64ToUtf8';
import Header from './Header';
import { headers } from 'next/headers';
import { X_HEADER_TITLE, X_PATH_NAME } from '@/constants/customHeaderKeys';
import MainHeader from './MainHeader';

export default function ServerSideHeader() {
  const headerTitleProps = headers().get(X_HEADER_TITLE) ?? '';
  const pathName = headers().get(X_PATH_NAME) ?? '';
  const prop = JSON.parse(base64ToUtf8(headerTitleProps) || '{}');

  if (pathName === '/') {
    return <MainHeader />;
  }
  return <Header initColor={prop.backgroundColor} initTitle={prop.title} />;
}
