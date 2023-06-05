import localFont from 'next/font/local';

// Font files can be colocated inside of `app`
const pretendard = localFont({
  src: '../../public/PretendardVariable.woff2',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Segoe UI',
    'Apple SD Gothic Neo',
    'Noto Sans KR',
    'Malgun Gothic',
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'sans-serif'
  ]
});

export default pretendard;
