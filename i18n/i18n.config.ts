import zhTW from './locales/zh-TW/index';
import enUS from './locales/en-US/index';

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'zh-TW',
    fallbackLocale: 'zh-TW',
    messages: {
        'zh-TW': zhTW,
        'en-US': enUS
    }
}));
