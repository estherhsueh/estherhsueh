<template>
    <div class="work-page">
        <h1 class="page-title">
            <span class="title-01">{{ $t('work.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('work.title_02') }}</span>
        </h1>

        <div class="filter-buttons">
            <button
                v-for="filter in filters"
                :key="filter.value"
                :class="['filter-btn', { active: activeFilter === filter.value }]"
                @click="activeFilter = filter.value"
            >
                {{ $t(filter.label) }}
            </button>
        </div>

        <div class="projects-grid">
            <NuxtLink
                v-for="project in filteredProjects"
                :key="project.id"
                :to="localePath(`/work/${project.id}`)"
                class="project-card"
            >
                <div class="project-image" />

                <div class="project-info">
                    <h2 class="project-title">{{ project.title }}</h2>

                    <div class="project-tags">
                        <span
                            v-for="(tag, index) in project.tags"
                            :key="index"
                            class="project-tag"
                        >
                            {{ tag }}
                        </span>
                    </div>

                    <div class="project-button">
                        <Icon
                            class="project-arrow"
                            name="custom:project-arrow"
                        />
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    title: 'Work'
});

const { t } = useI18n();
const localePath = useLocalePath();

const { getProjectsByFilter } = useProjects();

useHead({
    title: `${t('work.title_01')} ${t('work.title_02')}`
});

const activeFilter = ref('all');

const filters = [
    { value: 'all', label: 'work.filters.all' },
    { value: 'web', label: 'work.filters.web' },
    { value: 'app', label: 'work.filters.app' },
    { value: 'others', label: 'work.filters.others' }
];

// 使用共用的專案資料和篩選函數
const filteredProjects = computed(() => {
    return getProjectsByFilter(activeFilter.value);
});
</script>

<style lang="scss" scoped>
@use './index';
</style>
