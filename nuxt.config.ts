// https://nuxt.com/docs/api/configuration/nuxt-config
import fs from 'fs';
import path from 'path';
import { useProjects } from './composables/useProjects';
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
    hooks: {
        'build:before': () => {
            const { getProjectLocaleData } = useProjects();
            const locales = ['zh-TW', 'en-US'];

            locales.forEach((locale) => {
                try {
                    // 獲取該語系的專案資料
                    const localeData = getProjectLocaleData(locale);

                    // 設定檔案路徑
                    const dirPath = path.resolve(process.cwd(), 'i18n', 'locales', locale, 'articles');
                    const filePath = path.join(dirPath, 'articles.json');

                    // 確保目錄存在
                    if (!fs.existsSync(dirPath)) {
                        fs.mkdirSync(dirPath, { recursive: true });
                    }

                    // 寫入 JSON 檔案
                    fs.writeFileSync(filePath, JSON.stringify(localeData, null, 2), 'utf-8');
                }
                catch (error) {
                    console.error(`❌ Error generating ${locale} articles.json:`, error);
                }
            });
        }
    },
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
