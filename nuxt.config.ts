// https://nuxt.com/docs/api/configuration/nuxt-config
import { getFileListPages } from './i18n/locales/config';

export default defineNuxtConfig({
    modules: [
        '@nuxt/icon',
        '@nuxt/eslint',
        '@nuxtjs/i18n'
    ],
    imports: {
        autoImport: true
    },
    devtools: {
        enabled: true
    },
    css: [
        '~~/assets/styles/main.scss'
    ],
    compatibilityDate: '2025-07-15',
    routeRules: {
        '/backstage': { redirect: '/backstage/projects' }
    },
    eslint: {
        config: {
            standalone: true,
            stylistic: true
        }
    },
    i18n: {
        // langDir: 'locales/',
        defaultLocale: 'zh-TW',
        vueI18n: 'i18n.config.ts',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            fallbackLocale: 'zh-TW'
        },
        locales: [
            {
                code: 'zh-TW',
                iso: 'zh-TW',
                name: '繁體中文',
                files: [
                    'zh-TW/articles/articles.json',
                    ...getFileListPages('zh-TW')
                ]
            },
            {
                code: 'en-US',
                iso: 'en-US',
                name: 'English',
                files: [
                    'en-US/articles/articles.json',
                    ...getFileListPages('en-US')
                ]
            }
        ]
    },
    icon: {
        mode: 'svg',
        customCollections: [
            {
                prefix: 'custom',
                dir: './assets/icons'
            }
        ]
    }
});
