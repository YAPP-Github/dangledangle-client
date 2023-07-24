type HeaderServerSideRenderProp = {
  url: string | RegExp;
  backgroundColor?: 'white' | 'default';
  title?: string;
};

export const headerServerSideRenderProp: HeaderServerSideRenderProp[] = [
  {
    url: /\/shelter\/\d/,
    backgroundColor: 'white'
  },
  {
    url: '/login',
    title: '로그인 또는 회원가입'
  },
  {
    url: '/login/volunteer',
    title: '개인봉사자로 시작하기'
  }
];
