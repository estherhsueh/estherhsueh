<template>
    <section class="featured-projects">
        <h2 class="section-title">
            <span class="title-01">{{ $t('home.featured.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('home.featured.title_02') }}</span>
        </h2>

        <div class="projects-list">
            <NuxtLink
                v-for="project in featuredProjects"
                :key="project.id"
                :to="localePath(`/work/${project.id}`)"
                class="project-card"
            >
                <div class="project-image">
                    <img
                        v-if="project.image"
                        :src="project.image"
                        :alt="project.title"
                    >
                    <div
                        v-else
                        class="project-image-placeholder"
                    >
                        {{ project.title.charAt(0) }}
                    </div>
                </div>

                <div class="project-content">
                    <div class="project-info">
                        <h3 class="project-title">
                            {{ project.title }}
                        </h3>
                        <p class="project-description">
                            {{ project.description }}
                        </p>
                    </div>
                    <div class="project-tags">
                        <span
                            v-for="tag in project.tags"
                            :key="tag"
                            class="project-tag"
                        >
                            {{ tag }}
                        </span>
                    </div>
                    <div class="project-action">
                        <Icon
                            class="project-arrow"
                            name="custom:project-arrow"
                        />
                    </div>
                </div>
            </NuxtLink>
        </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { getFeaturedProjects } = useProjects();

// 獲取精選專案
const featuredProjects = getFeaturedProjects();
</script>

<style lang="scss" scoped>
@import './HomeFeaturedProjects';
</style>
