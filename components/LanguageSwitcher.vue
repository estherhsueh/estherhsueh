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

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.language-switcher {
    display: flex;
    align-items: center;
}

.language-select {
    padding: 8px 12px;
    border: 1px solid rgb(163 164 181 / 30%);
    border-radius: 8px;
    background-color: rgb(255 255 255 / 5%);
    color: $grey-100;
    cursor: pointer;
    transition: all $transition-base;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
    font-family: $font-family-base;

    &:hover {
        border-color: $grey-200;
        background-color: rgb(255 255 255 / 8%);
    }

    &:focus {
        border-color: $grey-100;
        background-color: rgb(255 255 255 / 10%);
        outline: none;
    }

    option {
        background-color: $grey-800;
        color: $grey-50;
    }
}
</style>
