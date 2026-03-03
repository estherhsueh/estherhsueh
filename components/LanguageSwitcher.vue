<template>
    <div class="language-switcher">
        <button
            v-for="option in availableLocales"
            :key="option.code"
            class="lang-btn"
            :class="{ 'is-active': locale === option.code }"
            @click="switchTo(option.code)"
        >
            {{ option.label }}
        </button>
    </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n();

const availableLocales = [
    { code: 'zh-TW', label: '繁中' },
    { code: 'en-US', label: 'EN' }
];

const switchTo = (code: string) => {
    setLocale(code as 'zh-TW' | 'en-US');
};
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.language-switcher {
    display: flex;
    gap: 2px;
    align-items: center;
    align-self: flex-start;
    padding: 4px;
    border-radius: 20px;
    background: rgb(255 255 255 / 6%);

    @include md {
        align-self: center;
    }
}

.lang-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 16px;
    background: transparent;
    color: $grey-300;
    cursor: pointer;
    transition: all $transition-base;
    letter-spacing: 0;
    font-weight: $font-weight-medium;
    font-size: 13px;
    font-family: $font-family-base;

    &:hover:not(.is-active) {
        color: $grey-100;
    }

    &.is-active {
        background: rgb(255 255 255 / 10%);
        color: $grey-50;
        font-weight: $font-weight-semibold;
    }
}
</style>
