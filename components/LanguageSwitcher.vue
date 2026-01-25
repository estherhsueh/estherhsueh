<template>
    <div class="language-switcher">
        <select
            v-model="selectedLocale"
            class="language-select"
            @change="changeLanguage"
        >
            <option
                v-for="localeOption in availableLocales"
                :key="localeOption.code"
                :value="localeOption.code"
            >
                {{ localeOption.name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();

// 定義可用的語言選項
const availableLocales = computed(() => [
    {
        code: 'zh-TW',
        name: '繁體中文'
    },
    {
        code: 'en-US',
        name: 'English'
    }
]);

const selectedLocale = ref(locale.value);

const changeLanguage = () => {
    setLocale(selectedLocale.value);
};

// 監聽 locale 變化，同步更新選中的語言
watch(locale, (newLocale) => {
    selectedLocale.value = newLocale;
});
</script>

<style scoped>
.language-switcher {
    display: flex;
    align-items: center;
}

.language-select {
    padding: 8px 12px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    transition: border-color 0.2s;
    font-size: 14px;
}

.language-select:hover {
    border-color: #666;
}

.language-select:focus {
    border-color: #000;
    outline: none;
}
</style>
