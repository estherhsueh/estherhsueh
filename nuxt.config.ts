// https://nuxt.com/docs/api/configuration/nuxt-config
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
    eslint: {
        config: {
            standalone: true,
            stylistic: true
        }
    },
    i18n: {
        locales: [
            {
                code: 'zh-TW',
                iso: 'zh-TW',
                name: '繁體中文',
                file: 'zh-TW.json'
            },
            {
                code: 'en-US',
                iso: 'en-US',
                name: 'English',
                file: 'en-US.json'
            }
        ],
        langDir: 'locales/',
        defaultLocale: 'zh-TW',
        strategy: 'prefix_except_default',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            fallbackLocale: 'zh-TW'
        },
        vueI18n: './i18n/i18n.config.ts'
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
