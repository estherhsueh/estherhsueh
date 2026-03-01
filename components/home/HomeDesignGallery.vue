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
                    v-if="project.isLocked && !isAuthenticated"
                    class="lock-icon-container"
                >
                    <Icon
                        name="custom:lock"
                        class="lock-icon"
                    />
                </div>

                <div class="gallery-image">
                    <img
                        :src="`/images/projects/${project.id}/cover.jpg`"
                        :alt="$t(`${project.id}.title`)"
                    >
                </div>

                <div class="gallery-info">
                    <h3 class="gallery-title">{{ $t(`${project.id}.title`) }}</h3>

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
const { getGalleryProjects } = useProjects();
const { navigateToProject } = useProjectNavigation();
const { observeElements } = useScrollAnimation();

const isAuthenticated = ref(false);
const headerEl = ref<HTMLElement>();
const galleryItems = ref<HTMLElement[]>([]);

onMounted(() => {
    if (import.meta.client) {
        isAuthenticated.value = sessionStorage.getItem('isAuthenticated') === 'true';
    }

    const allElements = [headerEl.value, ...galleryItems.value].filter(Boolean) as HTMLElement[];
    observeElements(allElements);

    galleryItems.value.forEach((item, index) => {
        if (item) {
            item.style.transitionDelay = `${150 + index * 100}ms`;
        }
    });
});

// 獲取設計畫廊專案
const galleryProjects = getGalleryProjects();
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
