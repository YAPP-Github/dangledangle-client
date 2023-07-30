import { X_PATH_NAME } from '@/constants/customHeaderKeys';
import { NextRequest } from 'next/server';

interface CustomMiddleWareProps {
  req: NextRequest;
  requestHeaders: Headers;
}

export default function appendPathName({
  req,
  requestHeaders
}: CustomMiddleWareProps) {
  requestHeaders.set(X_PATH_NAME, req.nextUrl.pathname);
}
