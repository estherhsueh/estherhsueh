import zhTW from './locales/zh-TW.json';
import enUS from './locales/en-US.json';

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'zh-TW',
    fallbackLocale: 'zh-TW',
    messages: {
        'zh-TW': zhTW,
        'en-US': enUS
    }
}));
