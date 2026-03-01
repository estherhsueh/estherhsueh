<template>
    <div class="home-page">
        <div
            ref="profileSection"
            class="scroll-animate"
        >
            <HomeProfile />
        </div>

        <div
            ref="featuredSection"
            class="scroll-animate"
        >
            <HomeFeaturedProjects />
        </div>

        <div
            ref="gallerySection"
            class="scroll-animate"
        >
            <HomeDesignGallery />
        </div>
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
const { observeElements } = useScrollAnimation();

const profileSection = ref<HTMLElement>();
const featuredSection = ref<HTMLElement>();
const gallerySection = ref<HTMLElement>();

definePageMeta({
    title: 'Home'
});

onMounted(() => {
    const elements = [
        profileSection.value,
        featuredSection.value,
        gallerySection.value
    ].filter(Boolean) as HTMLElement[];

    observeElements(elements);
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

@keyframes fade-in-up {
    from {
        transform: translateX(30px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.scroll-animate {
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    transform: translateX(30px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
