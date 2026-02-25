<template>
    <div class="home-page">
        <HomeProfile />
        <HomeFeaturedProjects />
        <HomeDesignGallery />
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();

definePageMeta({
    title: 'Home'
});

// 設置頁面 SEO
useHead({
    title: t('home.title'),
    meta: [
        { name: 'description', content: t('home.hero.description') }
    ]
});
</script>

<style lang="scss" scoped>
.home-page {
    width: 100%;
    background: #010109;
}
</style>
