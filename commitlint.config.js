module.exports = {
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      ['sentence-case', 'start-case', 'pascal-case', 'upper-case'],
    ],
    'subject-empty': [1, 'never'],
    'subject-full-stop': [1, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
  prompt: {
    questions: {
      types: {
        chore: {
          description: 'Build process or auxiliary tool changes',
          emoji: '♻️',
          title: 'Chores',
        },
        ci: {
          description:
            'Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)',
          title: 'Continuous Integrations',
          emoji: '🤖',
        },
        docs: {
          description: 'Documentation only changes',
          emoji: '📚',
          title: 'Documentation',
        },
        feat: {
          description: 'A new feature',
          emoji: '✨',
          title: 'Features',
        },
        fix: {
          description: 'A bug fix',
          emoji: '🐛',
          title: 'Bug Fixes',
        },
        perf: {
          description: 'A code change that improves performance',
          emoji: '⚡️',
          title: 'Performance Improvements',
        },
        refactor: {
          description:
            'A code change that neither fixes a bug or adds a feature',
          emoji: '📦',
          title: 'Code Refactoring',
        },
        release: {
          description: 'Create a release commit',
          emoji: '🚀',
          title: 'Release',
        },
        style: {
          description:
            'Markup, white-space, formatting, missing semi-colons...',
          emoji: '💄',
          title: 'Styles',
        },
        test: {
          description: 'Adding missing tests',
          emoji: '💍',
          title: 'Test',
        },
        build: {
          description:
            'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
          title: 'Builds',
          emoji: '🛠',
        },
        revert: {
          description: 'Reverts a previous commit',
          title: 'Reverts',
          emoji: '🗑',
        },
        messages: {
          type: "Select the type of change that you're committing:",
          customScope: 'Select the scope this component affects:',
          subject:
            'Write a short, imperative mood description of the change:\n',
          body: 'Provide a longer description of the change:\n ',
          breaking: 'List any breaking changes:\n',
          footer: 'Issues this commit closes, e.g #123:',
          confirmCommit: 'The packages that this commit has affected\n',
        },
      },
      scope: {
        description:
          'What is the scope of this change (e.g. component or file name)',
      },
      subject: {
        description:
          'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
      isIssueAffected: {
        description: 'Does this change affect any open issues?',
      },
      issuesBody: {
        description:
          'If issues are closed, the commit requires a body. Please enter a longer description of the commit itself',
      },
      issues: {
        description: 'Add issue references (e.g. "fix #123", "re #123".)',
      },
    },
  },
};
