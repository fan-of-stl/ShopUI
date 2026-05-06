export default {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'refactor',
        'style',
        'docs',
        'test',
        'chore',
      ],
    ],

    'subject-case': [2, 'never', ['upper-case']],

    'subject-empty': [2, 'never'],
  },
};