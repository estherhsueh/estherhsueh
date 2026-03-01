<template>
    <section class="design-gallery">
        <div class="section-header">
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
                :href="localePath(`/work/${project.id}`)"
                class="gallery-item"
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

const isAuthenticated = ref(false);

onMounted(() => {
    isAuthenticated.value = sessionStorage.getItem('isAuthenticated') === 'true';
});

// 獲取設計畫廊專案
const galleryProjects = getGalleryProjects();
</script>

<style lang="scss" scoped>
@use './HomeDesignGallery';
</style>
