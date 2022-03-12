module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: [
        '@typescript-eslint',
        'import',
        'mocha',
        'prettier',
        'simple-import-sort',
    ],
    rules: {
        '@typescript-eslint/array-type': [
            'error',
            {default: 'array'},
        ],
        'no-banned-terms': 0,
        'no-delete-expression': 0,
        'no-disable-auto-sanitization': 0,
        'no-document-domain': 0,
        'no-document-write': 0,
        'no-eval': 0,
        'no-exec-script': 0,
        'function-constructor': 0,
        'no-http-string': [
            0,
            'http://www.example.com/?.*',
            'http://www.examples.com/?.*',
        ],
        'no-inner-html': 0,
        'no-octal-literal': 0,
        'no-string-based-set-immediate': 0,
        'no-string-based-set-interval': 0,
        'no-string-based-set-timeout': 0,
        'react-no-dangerous-html': 0,
        'chai-vague-errors': 0,
        'forin': 0,
        'jquery-deferred-must-complete': 0,
        'label-position': 0,
        'mocha-avoid-only': 0,
        '@typescript-eslint/no-explicit-any': 1,
        'no-arg': 0,
        'no-bitwise': 0,
        'no-conditional-assignment': 0,
        'no-console': [
            0,
            'debug',
            'info',
            'log',
            'time',
            'timeEnd',
            'trace',
        ],
        'no-constant-condition': 0,
        'no-control-regex': 0,
        'no-debugger': 0,
        'no-duplicate-switch-case': 0,
        'no-duplicate-variable': 0,
        'no-empty': 0,
        'increment-decrement': 0,
        'no-invalid-regexp': 0,
        'no-invalid-this': 1,
        'no-missing-visibility-modifiers': 0,
        'no-regex-spaces': 0,
        'no-sparse-arrays': 0,
        'no-string-literal': 0,
        'unnecessary-bind': 0,
        'no-unnecessary-override': 0,
        'no-unused-expression': 0,
        'no-with-statement': 0,
        'promise-must-complete': 0,
        'radix': 0,
        'switch-default': 0,
        'triple-equals': [
            0,
            'allow-null-check',
        ],
        'ordered-imports': 0,
        'use-isnan': 0,
        'use-named-parameter': 0,
        'class-name': 0,
        'comment-format': [
            0,
            'check-space',
        ],
        'export-name': 0,
        'import-name': 0,
        'interface-name': [
            0,
            'never-prefix',
        ],
        'jsdoc-format': 0,
        'max-func-body-length': [
            0,
            100,
            {
                'ignore-parameters-to-function-regex': 'describe',
            },
        ],
        'member-access': 0,
        'new-parens': 0,
        'no-construct': 0,
        'no-default-export': 0,
        'no-empty-interface': 0,
        'no-for-in': 0,
        'no-function-expression': 0,
        '@typescript-eslint/no-inferrable-types': 1,
        'no-shadowed-variable': 0,
        'no-unnecessary-local-variable': 0,
        'no-var-keyword': 0,
        'no-var-requires': 0,
        'sort-keys': [
            'error',
            'asc',
            {'caseSensitive': true, 'natural': false, 'minKeys': 2}],
        'one-variable-per-declaration': 0,
        'prefer-array-literal': 0,
        'prefer-const': 0,
        'typedef': [
            0,
            'call-signature',
            'parameter',
            'property-declaration',
            'member-variable-declaration',
        ],
        'variable-name': [
            0,
            'ban-keywords',
        ],
        '@typescript-eslint/no-namespace': 1,
        'no-reference': 0,
        'prefer-type-cast': 0,
        '@typescript-eslint/no-non-null-assertion': 1,
        '@typescript-eslint/no-unnecessary-type-assertion': 1,
        '@typescript-eslint/consistent-type-assertions': 2,
        'no-duplicate-parameter-names': 0,
        'no-multiple-var-decl': 0,
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
    },
};
