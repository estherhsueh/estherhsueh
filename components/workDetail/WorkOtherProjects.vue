<template>
    <div class="other-projects">
        <h2 class="section-title">
            <span class="title-01">{{ $t('workDetail.otherProjects_title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('workDetail.otherProjects_title_02') }}</span>
        </h2>

        <div class="projects-scroll-container">
            <div class="projects-container">
                <div class="projects-list">
                    <a
                        v-for="(project, index) in projects"
                        :key="index"
                        :href="localePath(`/work/${project.id}`)"
                        class="project-item"
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

                        <div class="project-image">
                            <img
                                :src="project.cover_image"
                                :alt="getLocaleText(project.title, locale)"
                            >
                        </div>

                        <div class="project-info">
                            <h3 class="project-title">{{ getLocaleText(project.title, locale) }}</h3>

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
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProjectRow } from '~/types/project';

const localePath = useLocalePath();
const { locale } = useI18n();
const { getLocaleText } = useProjects();
const { navigateToProject } = useProjectNavigation();

const isAuthenticated = ref(false);

onMounted(() => {
    isAuthenticated.value = sessionStorage.getItem('isAuthenticated') === 'true';
});

defineProps<{
    projects: ProjectRow[]
}>();
</script>

<style lang="scss" scoped>
@use './WorkOtherProjects';
</style>
