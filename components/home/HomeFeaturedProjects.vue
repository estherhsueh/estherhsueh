<template>
    <section class="featured-projects">
        <h2
            ref="titleEl"
            class="section-title scroll-animate-title"
        >
            <span class="title-01">{{ $t('home.featured.title_01') }}</span>
            <span class="title-02 font-italic-playfair">{{ $t('home.featured.title_02') }}</span>
        </h2>

        <div class="projects-list">
            <a
                v-for="(project, index) in featuredProjects"
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

                <div class="project-image">
                    <img
                        :src="project.cover_image"
                        :alt="getLocaleText(project.title, locale)"
                    >
                </div>

                <div class="project-content">
                    <div class="project-info">
                        <h3 class="project-title">
                            {{ getLocaleText(project.title, locale) }}
                        </h3>
                        <p class="project-description">
                            {{ getLocaleText(project.description, locale) }}
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
const { locale } = useI18n();
const { featuredProjects, getLocaleText } = useProjects();
const { navigateToProject } = useProjectNavigation();
const { observeElements } = useScrollAnimation();

const isAuthenticated = ref(false);
const titleEl = ref<HTMLElement>();
const projectCards = ref<HTMLElement[]>([]);

onMounted(() => {
    if (import.meta.client) {
        isAuthenticated.value = sessionStorage.getItem('isAuthenticated') === 'true';
    }

    const allElements = [titleEl.value, ...projectCards.value].filter(Boolean) as HTMLElement[];
    observeElements(allElements);

    projectCards.value.forEach((card, index) => {
        if (card) {
            card.style.transitionDelay = `${100 + index * 150}ms`;
        }
    });
});
</script>

<style lang="scss" scoped>
@use './HomeFeaturedProjects';

.scroll-animate-title {
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
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
