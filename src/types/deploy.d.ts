declare namespace NodeJS {
  interface Process {
    env: {
      [x: string]: string | undefined;
      NEXT_PUBLIC_VERCEL_URL?: string; //vercel preview로 배포되는 URL,
      NEXT_PUBLIC_VERCEL_ENV?: string; // "preview" | "production" ...
      NEXT_PUBLIC_VERCEL_BRANCH_URL?: string; //dangledangle-git-<브랜치이름>-dangledangle.vercel.app
    };
  }
}
