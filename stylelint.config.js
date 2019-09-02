module.exports = {
  processors: [],
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'at-rule-empty-line-before': 'always' || 'never',
    'at-rule-name-case': 'lower' || 'upper',
    'block-no-empty': true,
    'font-family-no-missing-generic-family-keyword': null,
  },
};
