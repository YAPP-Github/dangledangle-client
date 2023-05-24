module.exports = {
  types: [
    { value: '✨ feat', name: '✨ feat:\t새로운 기능 추가' },
    { value: '🔨 fix', name: '🔨 fix:\t버그, 오류 수정' },
    {
      value: '🚀 update',
      name: '🚀 update: \t로직 또는 api 수정 (기획 변경으로 인한 feat 커밋 이후 수정되는 경우)'
    },
    {
      value: '🤖 refactor',
      name: '🤖 refactor:\t리팩토링(새로운 기능 추가되지 않음)'
    },
    { value: '📜 docs', name: '📜 docs:\t문서 추가 혹은 업데이트' },
    { value: '🪄 create', name: '🪄 create:\t새로운 파일 생성' },
    { value: '🔥 remove', name: '🔥 remove:\t파일 삭제 또는 파일명 변경' },
    {
      value: '💄 style',
      name: '💄 style:\t코드 포맷팅 (prettier 적용, 공백 추가/제거, 변수명 변경 등)'
    },
    {
      value: '✅ test',
      name: '✅ test:\t테스트 케이스 관련 코드 변경'
    },
    {
      value: '🚚 chore',
      name: '🚚 chore:\t기타 변경 사항 (라이브러리 업데이트, 주석 추가/제거 등)'
    },
    {
      value: '📦 build',
      name: '📦 build:\t빌드 관련 파일 수정 (CI/CD 설정 등)'
    }
  ],
  scopes: [{ name: '*' }],
  allowCustomScopes: true,
  skipQuestions: ['scope', 'body', 'breaking', 'footer'],
  allowBreakingChanges: ['feat', 'fix'],
  usePreparedCommit: false,
  subjectLimit: 100,
  messages: {
    type: '커밋의 유형(태그)을 선택하세요:',
    scope: '\n이 변경의 범위(SCOPE)를 작성해주세요 (선택사항):',
    customScope: '이 범위(SCOPE)를 작성해주세요 :',
    subject: '변경에 대한 간결하게, 명령형으로 설명을 작성해주세요:\n',
    body: '변경에 대한 자세한 설명을 작성하세요 "|"를 사용하여 줄바꿈 가능합니다 (선택사항):\n',
    breaking: '모든 BREAKING CHANGES를 나열하세요 (선택사항):\n',
    footer:
      '이 변경에 의해 해결된 이슈를 나열하세요  ex): #31, #34 (선택사항):\n',
    confirmCommit: '위의 커밋을 진행하시겠습니까?'
  }
};
