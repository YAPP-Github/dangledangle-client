import { base64ToUtf8 } from '@/utils/base64ToUtf8';
import Header from './Header';
import { headers } from 'next/headers';

export default function ServerSideHeader() {
  const header = headers().get('X-My-Custom-Header') ?? '';

  const prop = JSON.parse(base64ToUtf8(header) || '{}');
  return <Header initColor={prop.backgroundColor} initTitle={prop.title} />;
}
