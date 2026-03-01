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
            <a
                v-for="project in filteredProjects"
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

                <img
                    class="project-image"
                    :src="`/images/projects/${project.id}/cover.jpg`"
                    :alt="$t(`${project.id}.title`)"
                >

                <div class="project-info">
                    <h2 class="project-title">{{ $t(`${project.id}.title`) }}</h2>

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
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
const filters = [
    { value: 'all', label: 'work.filters.all' },
    { value: 'web', label: 'work.filters.web' },
    { value: 'app', label: 'work.filters.app' },
    { value: 'others', label: 'work.filters.others' }
];

const { t } = useI18n();
const localePath = useLocalePath();
const { navigateToProject } = useProjectNavigation();

const { getProjectsByFilter } = useProjects();

const activeFilter = ref('all');
const isAuthenticated = ref(false);

onMounted(() => {
    isAuthenticated.value = sessionStorage.getItem('isAuthenticated') === 'true';
});

// 使用共用的專案資料和篩選函數
const filteredProjects = computed(() => {
    return getProjectsByFilter(activeFilter.value);
});

const title = `${t('work.title_01')} ${t('work.title_02')}`;
useHead({
    title,
    meta: [
        { property: 'og:title', content: title }
    ]
});
</script>

<style lang="scss" scoped>
@use './index';
</style>
