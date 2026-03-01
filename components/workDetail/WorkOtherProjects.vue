<template>
    <div class="other-projects">
        <h2 class="section-title">
            <span class="title-01">{{ $t('workDetail.otherProjects_title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('workDetail.otherProjects_title_02') }}</span>
        </h2>

        <div class="projects-scroll-container">
            <div class="projects-container">
                <div class="projects-list">
                    <NuxtLink
                        v-for="(project, index) in projects"
                        :key="index"
                        :to="localePath(`/work/${project.id}`)"
                        class="project-item"
                    >
                        <div class="project-image">
                            <img
                                :src="`/images/projects/${project.id}/cover.jpg`"
                                :alt="$t(`${project.id}.title`)"
                            >
                        </div>
                        <div class="project-info">
                            <h3 class="project-title">{{ $t(`${project.id}.title`) }}</h3>

                            <div
                                v-if="project.tags"
                                class="project-tags"
                            >
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
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProjectData } from '~/data/projects';

const localePath = useLocalePath();

defineProps<{
    projects: ProjectData[]
}>();
</script>

<style lang="scss" scoped>
@use './WorkOtherProjects';
</style>
