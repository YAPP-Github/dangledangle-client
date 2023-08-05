export type FooterServerSideRenderProp = {
  url: string | RegExp;
  visible?: boolean;
  backgroundColor?: 'white' | 'default';
};

export const footerServerSideRenderProp: FooterServerSideRenderProp[] = [
  { url: /\/shelter\/\d+$/, visible: true },
  { url: '/', visible: true }
];
