<template>
    <div
        v-if="currentProject"
        class="work-detail-page"
    >
        <WorkBanner :cover-image="currentProject.cover_image" />

        <div class="work-detail-container">
            <WorkOverview :project="currentProject" />

            <WorkContent :detail-images="currentProject.detail_images ?? []" />
        </div>

        <WorkOtherProjects :projects="recommendedProjects" />
    </div>
</template>

<script setup lang="ts">
import WorkBanner from '~/components/workDetail/WorkBanner.vue';
import WorkOverview from '~/components/workDetail/WorkOverview.vue';
import WorkContent from '~/components/workDetail/WorkContent.vue';
import WorkOtherProjects from '~/components/workDetail/WorkOtherProjects.vue';

const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { locale } = useI18n();

const { getProjectById, getRecommendedProjects, getLocaleText } = useProjects();

const projectId = route.params.id as string;

const currentProject = getProjectById(projectId);
const recommendedProjects = getRecommendedProjects(projectId, 3);

// 檢查 locked 專案授權（資料載入後觸發）
watch(currentProject, (project) => {
    if (project?.is_locked && import.meta.client) {
        const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
        if (!isAuthenticated) {
            router.push(localePath(`/auth?redirect=${encodeURIComponent(`/work/${projectId}`)}`));
        }
    }
}, { immediate: true });

// 動態 meta
const pageTitle = computed(() =>
    currentProject.value ? getLocaleText(currentProject.value.title, locale.value) : ''
);
const pageDescription = computed(() =>
    currentProject.value ? getLocaleText(currentProject.value.description, locale.value) : ''
);

useHead({
    title: pageTitle,
    meta: [
        { name: 'description', content: pageDescription },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription }
    ]
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.work-detail-page {
    overflow-x: hidden;
    margin-top: -72px;

    .work-detail-container {
        max-width: 350px;
        margin: 0 auto;
        padding: 49.5px 0 60px;

        @include md {
            max-width: 730px;
            padding: 84.5px 0 60px;
        }

        @include lg {
            max-width: 1160px;
            padding: 60px 0 80px;
        }
    }
}
</style>
