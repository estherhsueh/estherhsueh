<template>
    <div class="home-page">
        <h1>{{ $t('home.title') }}</h1>
        <p>{{ $t('home.subtitle') }}</p>
        <p class="description">
            {{ $t('home.description') }}
        </p>
    </div>
</template>

<script setup lang="ts">
// Home 頁面
const { t } = useI18n();

definePageMeta({
    title: 'Home'
});

// 設置頁面 SEO
useHead({
    title: t('home.title'),
    meta: [
        { name: 'description', content: t('home.description') }
    ]
});
</script>

<style scoped>
.home-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
}

.home-page h1 {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 32px;
}

.home-page p {
    margin-bottom: 16px;
    color: #666;
    font-size: 18px;
}

.home-page .description {
    max-width: 600px;
    text-align: center;
    line-height: 1.6;
}
</style>
