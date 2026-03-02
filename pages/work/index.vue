<template>
    <div class="work-page">
        <h1
            ref="titleEl"
            class="page-title scroll-animate-title"
        >
            <span class="title-01">{{ $t('work.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('work.title_02') }}</span>
        </h1>

        <div
            ref="filtersEl"
            class="filter-buttons scroll-animate-filters"
        >
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
                v-for="(project, index) in filteredProjects"
                :key="project.id"
                ref="projectCards"
                :href="localePath(`/work/${project.id}`)"
                class="project-card scroll-animate-card"
                :data-index="index"
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

                <img
                    class="project-image"
                    :src="project.cover_image"
                    :alt="getLocaleText(project.title, locale)"
                >

                <div class="project-info">
                    <h2 class="project-title">{{ getLocaleText(project.title, locale) }}</h2>

                    <div class="project-tags">
                        <span
                            v-for="(tag, tagIndex) in project.tags"
                            :key="tagIndex"
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
    { value: 'landing page', label: 'work.filters.landing-page' }
];

const { t, locale } = useI18n();
const localePath = useLocalePath();
const { navigateToProject } = useProjectNavigation();
const { observeElements } = useScrollAnimation();

const { getProjectsByFilter, getLocaleText } = useProjects();

const activeFilter = ref('all');
const isAuthenticated = ref(false);
const titleEl = ref<HTMLElement>();
const filtersEl = ref<HTMLElement>();
const projectCards = ref<HTMLElement[]>([]);

// 使用共用的專案資料和篩選函數
const filteredProjects = computed(() => {
    return getProjectsByFilter(activeFilter.value);
});

// 觀察卡片元素的函數
const observeCards = () => {
    if (projectCards.value && projectCards.value.length > 0) {
        observeElements(projectCards.value);

        projectCards.value.forEach((card, index) => {
            if (card) {
                card.style.transitionDelay = `${index * 100}ms`;
            }
        });
    }
};

onMounted(() => {
    if (import.meta.client) {
        isAuthenticated.value = sessionStorage.getItem('isAuthenticated') === 'true';
    }

    const allElements = [titleEl.value, filtersEl.value].filter(Boolean) as HTMLElement[];
    observeElements(allElements);

    // 初始載入時也觀察卡片
    nextTick(() => {
        observeCards();
    });
});

// 監聽 filteredProjects 變化，當專案列表改變時重新觀察
watch(filteredProjects, () => {
    nextTick(() => {
        observeCards();
    });
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

.scroll-animate-title {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transform: translateX(30px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}

.scroll-animate-filters {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    transition-delay: 100ms;
    transform: translateX(30px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}

.scroll-animate-card {
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    transform: translateX(30px);
    opacity: 0;

    &.is-visible {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
