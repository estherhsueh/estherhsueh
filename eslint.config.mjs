// @ts-check
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';

// 直接使用 Nuxt ESLint 配置（standalone 模式）
export default createConfigForNuxt({
    features: {
        standalone: true,
        stylistic: true
    }
})
// 加入忽略規則
    .prepend({
        ignores: [
            '.nuxt',
            '.nuxt/**',
            'node_modules',
            'node_modules/**',
            'dist',
            'dist/**',
            '.output',
            '.output/**',
            'coverage',
            'coverage/**',
            '**/*.d.ts',
            '**/*.min.js'
        ]
    })
// 加入自訂規則
    .append({
        rules: {
            // 一般 JavaScript/TypeScript 規則
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-alert': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'object-shorthand': ['error', 'always'],

            // 程式碼品質
            'eqeqeq': ['error', 'always'],
            'curly': ['error', 'all'],
            'no-eval': 'error',
            'require-await': 'error',

            // 程式碼風格 (使用 @stylistic 前綴)
            '@stylistic/comma-dangle': ['error', 'never'],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/member-delimiter-style': ['error', {
                multiline: {
                    delimiter: 'none',
                    requireLast: false
                },
                singleline: {
                    delimiter: 'comma',
                    requireLast: false
                }
            }],
            '@stylistic/indent': ['error', 4, { SwitchCase: 1 }],
            '@stylistic/space-before-function-paren': ['error', 'always'],
            '@stylistic/arrow-parens': ['error', 'always'],
            '@stylistic/object-curly-spacing': ['error', 'always'],
            '@stylistic/array-bracket-spacing': ['error', 'never'],
            '@stylistic/max-len': ['warn', { code: 120, ignoreStrings: true, ignoreTemplateLiterals: true }],
            '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/eol-last': ['error', 'always'],

            // Vue 相關規則
            'vue/block-order': ['error', {
                order: ['template', 'script', 'style']
            }],
            'vue/component-name-in-template-casing': ['error', 'PascalCase'],
            'vue/component-definition-name-casing': ['error', 'PascalCase'],
            'vue/html-self-closing': ['error', {
                html: {
                    void: 'never',
                    normal: 'always',
                    component: 'always'
                }
            }],
            'vue/max-attributes-per-line': ['error', {
                singleline: 1,
                multiline: 1
            }],
            'vue/html-indent': ['error', 4, {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: []
            }]
        }
    });
