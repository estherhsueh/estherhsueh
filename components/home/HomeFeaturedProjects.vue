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
                        :src="project.image"
                        :alt="$t(`${project.id}.title`)"
                    >
                </div>

                <div class="project-content">
                    <div class="project-info">
                        <h3 class="project-title">
                            {{ $t(`${project.id}.title`) }}
                        </h3>
                        <p class="project-description">
                            {{ $t(`${project.id}.description`) }}
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
@use './HomeFeaturedProjects';
</style>
