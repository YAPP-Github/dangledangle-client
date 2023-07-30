import { base64ToUtf8 } from '@/utils/base64ToUtf8';
import Header from './Header';
import { headers } from 'next/headers';
import { X_HEADER_TITLE } from '@/constants/customHeaderKeys';

export default function ServerSideHeader() {
  const headerTitleProps = headers().get(X_HEADER_TITLE) ?? '';
  const prop = JSON.parse(base64ToUtf8(headerTitleProps) || '{}');

  return <Header initColor={prop.backgroundColor} initTitle={prop.title} />;
}
