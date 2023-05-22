module.exports = {
  types: [
    { value: '✨ feat', name: '✨ feat:\tAdd a new feature' },
    { value: '🐛 fix', name: '🐛 fix:\tModify production, UI,UX code' },
    { value: '📝 docs', name: '📝 docs:\tAdd or update documentation' },
    {
      value: '💄 style',
      name: '💄 Style:\tadd or update code format (not updation production, UI,UX code)'
    },
    {
      value: '🤖 refactor',
      name: '🤖 refactor:\tcode change that neither fixes a bug nor adds a feature'
    },
    {
      value: '✅ test',
      name: '✅ test:\tcode change related with tests cases'
    },
    {
      value: '🚚 chore',
      name: '🚚 chore:\tchanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation'
    }
  ],
  scopes: [{ name: '*' }],
  allowCustomScopes: false,
  skipQuestions: ['scope', 'body'],
  allowBreakingChanges: ['feat', 'fix'],
  usePreparedCommit: false,
  subjectLimit: 100,
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer:
      'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?'
  }
};
