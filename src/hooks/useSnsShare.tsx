import { useCallback, useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function useSnsShare() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js'; // 카카오톡 SDK
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // return으로 제거해주기
    };
  }, []);

  const shareToKakaoTalk = (title: string, url: string) => {
    if (window.Kakao === undefined) {
      return;
    }

    const kakao = window.Kakao;

    // 인증이 안되어 있는 경우, 인증
    if (!kakao.isInitialized()) {
      kakao.init(process.env.NEXT_PUBLIC_KAKAO_MAP_API);
    }

    kakao.Share.sendDefault({
      objectType: 'text',
      text: title,
      link: {
        mobileWebUrl: url,
        webUrl: url
      }
    });
  };

  const handleSnsShare = useCallback((title: string, url: string) => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: '댕글댕글과 함께 더 나은 세상을 만들어봐요!',
        url: url
      });
    } else {
      shareToKakaoTalk(title, url);
    }
  }, []);

  return { handleSnsShare };
}
