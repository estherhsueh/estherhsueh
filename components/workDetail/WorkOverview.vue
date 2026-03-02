<template>
    <div class="work-overview">
        <h1 class="project-title">
            {{ getLocaleText(project.title, locale) }}
        </h1>

        <div class="overview-card">
            <template v-if="getLocaleText(project.description, locale)">
                <div class="overview-description">
                    <p>{{ getLocaleText(project.description, locale) }}</p>
                </div>

                <div class="overview-divider" />
            </template>

            <div class="overview-details">
                <div
                    v-if="getLocaleText(project.company, locale)"
                    class="detail-item"
                >
                    <h3 class="detail-label">
                        {{ $t('workDetail.overview.company') }}
                    </h3>
                    <p class="detail-value">
                        {{ getLocaleText(project.company, locale) }}
                    </p>
                </div>
                <div
                    v-if="getLocaleText(project.responsibilities, locale)"
                    class="detail-item"
                >
                    <h3 class="detail-label">
                        {{ $t('workDetail.overview.responsibilities') }}
                    </h3>
                    <p class="detail-value">
                        {{ getLocaleText(project.responsibilities, locale) }}
                    </p>
                </div>
                <div
                    v-if="project.duration"
                    class="detail-item"
                >
                    <h3 class="detail-label">
                        {{ $t('workDetail.overview.duration') }}
                    </h3>
                    <p class="detail-value">
                        {{ project.duration }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ProjectRow } from '~/types/project';

const { locale } = useI18n();
const { getLocaleText } = useProjects();

defineProps<{
    project: ProjectRow
}>();
</script>

<style lang="scss" scoped>
@use './WorkOverview';
</style>
