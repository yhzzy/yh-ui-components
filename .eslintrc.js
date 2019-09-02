module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'airbnb-base',
    'prettier',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.common.js',
      },
    },
  },
  plugins: [
    'vue',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        'registeredComponentsOnly': false,
        'ignores': [],
      },
    ],
    'vue/singleline-html-element-content-newline': 0,
    'vue/name-property-casing': ['error', 'PascalCase',],
    'vue/prop-name-casing': ['error', 'camelCase',],
    'vue/require-prop-types': 'error',
    'vue/html-self-closing': [
      'error',
      {
        'html': {
          'void': 'any',
          'normal': 'any',
          'component': 'any',
        },
        'svg': 'always',
        'math': 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        'singleline': 10,
        'multiline': {
          'max': 1,
          'allowFirstLine': false,
        },
      },
    ],
    'vue/v-bind-style': ['error', 'shorthand',],
    'vue/v-on-style': ['error', 'shorthand',],
    'vue/order-in-components': [
      'error',
      {
        'order': [
          'el',
          'name',
          'parent',
          'functional',
          ['delimiters', 'comments'],
          ['components', 'directives', 'filters',],
          'extends',
          'mixins',
          'inheritAttrs',
          'model',
          ['props', 'propsData',],
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render',],
          'renderError',
        ],
      },
    ],
    'vue/attributes-order': [
      'error',
      {
        'order': [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
      },
    ],
  },
};
