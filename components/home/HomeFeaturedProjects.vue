<template>
    <section class="featured-projects">
        <h2 class="section-title">
            <span class="title-01">{{ $t('home.featured.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('home.featured.title_02') }}</span>
        </h2>

        <div class="projects-list">
            <a
                v-for="project in featuredProjects"
                :key="project.id"
                :href="localePath(`/work/${project.id}`)"
                class="project-card"
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

                <div class="project-image">
                    <img
                        :src="`/images/projects/${project.id}/cover.jpg`"
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
            </a>
        </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { getFeaturedProjects } = useProjects();
const { navigateToProject } = useProjectNavigation();

const isAuthenticated = ref(false);

onMounted(() => {
    isAuthenticated.value = sessionStorage.getItem('isAuthenticated') === 'true';
});

// 獲取精選專案
const featuredProjects = getFeaturedProjects();
</script>

<style lang="scss" scoped>
@use './HomeFeaturedProjects';
</style>
