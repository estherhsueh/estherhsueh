<template>
    <section class="design-gallery">
        <div
            ref="headerEl"
            class="section-header scroll-animate-header"
        >
            <h2 class="section-title">
                <span class="title-01">{{ $t('home.gallery.title_01') }}</span>
                <span class="title-02 font-italic-playfair">{{ $t('home.gallery.title_02') }}</span>
            </h2>

            <NuxtLink
                :to="localePath('/work')"
                class="view-all-button"
            >
                {{ $t('home.gallery.viewAll') }}

                <Icon
                    class="view-all-button-arrow"
                    name="custom:view-all-button-arrow"
                />
            </NuxtLink>
        </div>

        <div class="gallery-grid">
            <a
                v-for="(project, index) in galleryProjects"
                :key="index"
                ref="galleryItems"
                :href="localePath(`/work/${project.id}`)"
                class="gallery-item scroll-animate-item"
                :data-index="index"
                @click="navigateToProject(project, $event)"
            >
                <div
                    v-if="project.is_locked && !isAuthenticated"
                    class="lock-icon-container"
                >
                    <Icon
                        name="custom:lock"
                        class="lock-icon"
                    />
                </div>

                <div class="gallery-image">
                    <img
                        :src="project.cover_image"
                        :alt="getLocaleText(project.title, locale)"
                    >
                </div>

                <div class="gallery-info">
                    <h3 class="gallery-title">{{ getLocaleText(project.title, locale) }}</h3>

                    <div
                        v-if="project.tags"
                        class="gallery-tags"
                    >
                        <span
                            v-for="tag in project.tags"
                            :key="tag"
                            class="gallery-tag"
                        >
                            {{ tag }}
                        </span>
                    </div>

                    <div class="gallery-action">
                        <Icon
                            class="project-arrow"
                            name="custom:project-arrow"
                        />
                    </div>
                </div>
            </a>
        </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { locale } = useI18n();
const { galleryProjects, getLocaleText } = useProjects();
const { navigateToProject } = useProjectNavigation();
const { observeElements } = useScrollAnimation();

const isAuthenticated = ref(false);
const headerEl = ref<HTMLElement>();
const galleryItems = ref<HTMLElement[]>([]);

let scrollObserver: IntersectionObserver | null = null;

const observeItems = () => {
    scrollObserver?.disconnect();
    scrollObserver = null;

    galleryItems.value.forEach((item, index) => {
        if (item) {
            item.style.transitionDelay = `${150 + index * 100}ms`;
        }
    });

    const allElements = [headerEl.value, ...galleryItems.value].filter(Boolean) as HTMLElement[];
    scrollObserver = observeElements(allElements);
};

onMounted(() => {
    if (import.meta.client) {
        isAuthenticated.value = sessionStorage.getItem('isAuthenticated') === 'true';
    }

    observeItems();
});

// 資料非同步載入時重新觀察（避免 onMounted 時 galleryItems 為空）
watch(galleryProjects, () => {
    nextTick(observeItems);
});

onUnmounted(() => {
    scrollObserver?.disconnect();
    scrollObserver = null;
});
</script>

<style lang="scss" scoped>
@use './HomeDesignGallery';

.scroll-animate-header {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transform: translateX(30px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}

.scroll-animate-item {
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    transform: translateX(30px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
