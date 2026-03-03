import type { LocaleRow } from '~/types/locale';

// 與 nuxt.config.ts 的 i18n 設定保持一致
const DEFAULT_LOCALE = 'zh-TW';
const ALL_LOCALE_CODES = ['zh-TW', 'en-US'];

/**
 * 從路由路徑解析當前語系
 * strategy: 'prefix_except_default' → 預設語系無 prefix，其他語系有 /{code} prefix
 */
function detectLocaleFromPath (path: string): string {
    for (const code of ALL_LOCALE_CODES) {
        if (code !== DEFAULT_LOCALE && (path === `/${code}` || path.startsWith(`/${code}/`))) {
            return code;
        }
    }
    return DEFAULT_LOCALE;
}

/** 取得指定語系的首頁路徑 */
function getHomePath (localeCode: string): string {
    return localeCode === DEFAULT_LOCALE ? '/' : `/${localeCode}`;
}

export default defineNuxtRouteMiddleware(async (to) => {
    // 後台路由不需要語系保護
    if (to.path.startsWith('/backstage')) {
        return;
    }

    // 在所有 await 之前呼叫所有 composable，保留響應式上下文
    const enabledCodes = useState<string[] | null>('_enabledLocaleCodes', () => null);
    // i18n 使用此 cookie 記憶使用者的語系偏好，需同步更新以防 i18n 把使用者導回停用語系
    const i18nCookie = useCookie('i18n_redirected');

    if (enabledCodes.value === null) {
        try {
            const data = await $fetch<LocaleRow[]>('/api/settings/locales');
            enabledCodes.value = data.map((l) => l.code);
        }
        catch {
            // API 失敗時放行，不阻斷使用者體驗
            return;
        }
    }

    // 無任何啟用語系時放行（異常情況）
    if (!enabledCodes.value?.length) {
        return;
    }

    // 從 URL 路徑解析當前語系，完全不依賴 i18n composable
    const currentLocale = detectLocaleFromPath(to.path);

    // 當前語系已在啟用清單中，放行
    if (enabledCodes.value.includes(currentLocale)) {
        return;
    }

    // 當前語系已停用，導向第一個啟用語系的首頁
    const fallback = enabledCodes.value[0] as string;

    // 同步更新 i18n 的語系 cookie，防止 detectBrowserLanguage 把使用者
    // 導回剛才被停用的語系，造成 redirect loop（ERR_TOO_MANY_REDIRECTS）
    i18nCookie.value = fallback;

    return navigateTo(getHomePath(fallback));
});
