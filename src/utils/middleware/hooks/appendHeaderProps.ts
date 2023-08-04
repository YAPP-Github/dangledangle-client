import type { NextRequest } from 'next/server';
import { matchURL } from '../matchUrl';
import { headerServerSideRenderProp } from '../headerServerSideRenderProp';
import { X_HEADER_TITLE } from '@/constants/customHttpHeaderKeys';

interface CustomMiddleWareProps {
  req: NextRequest;
  requestHeaders: Headers;
}

export default function appendHeaderTitle({
  req,
  requestHeaders
}: CustomMiddleWareProps) {
  const matchHeaderURL = matchURL(headerServerSideRenderProp);
  const matchedIndex = matchHeaderURL(req.nextUrl.pathname);
  // 서버 컴포넌트에서 PathName 사용할 수 있도록 헤더에 전달
  if (matchedIndex !== null) {
    const str = JSON.stringify(headerServerSideRenderProp[matchedIndex]);
    const buffer = Buffer.from(str, 'utf8');
    const base64String = buffer.toString('base64');
    requestHeaders.set(X_HEADER_TITLE, base64String);
  }
}
