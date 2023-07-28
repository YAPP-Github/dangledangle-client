type HeaderServerSideRenderProp = {
  url: string | RegExp;
  backgroundColor?: 'white' | 'default';
  title?: string;
};

export const headerServerSideRenderProp: HeaderServerSideRenderProp[] = [
  {
    url: '/login',
    title: '로그인 또는 회원가입'
  },
  {
    url: '/login/volunteer',
    title: '개인봉사자로 시작하기'
  },
  {
    url: '/login/shelter',
    title: '보호소 파트너로 시작하기'
  },
  {
    url: '/login/shelter/password',
    title: '비밀번호 찾기'
  },
  {
    url: '/register/shelter',
    title: '보호소 파트너 계정 가입'
  },
  {
    url: '/register/volunteer',
    title: '개인봉사자로 시작하기.'
  },
  {
    url: /\/shelter\/\d/,
    backgroundColor: 'white'
  },
  {
    url: '/admin/shelter/edit',
    title: '보호소 정보'
  },
  {
    url: /\/admin\/shelter\/edit\/.+/,
    title: '추가 정보'
  }
];
