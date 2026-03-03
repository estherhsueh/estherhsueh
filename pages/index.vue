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
const title = t('home.title');
const description = t('home.profile.description');
useHead({
    title,
    meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description }
    ]
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.home-page {
    overflow-x: hidden;
    max-width: 350px;
    margin: 0 auto;

    @include md {
        max-width: 730px;
    }

    @include lg {
        max-width: 1160px;
    }
}
</style>
