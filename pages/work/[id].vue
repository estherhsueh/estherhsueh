<template>
    <div
        v-if="currentProject"
        class="work-detail-page"
    >
        <WorkBanner :id="currentProject.id" />

        <div class="work-detail-container">
            <WorkOverview
                :id="currentProject.id"
                :duration="currentProject.duration"
            />

            <WorkContent
                :id="currentProject.id"
                :detail-image-count="currentProject.detailImageCount"
            />
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

const { t } = useI18n();

const { getProjectById, getRecommendedProjects } = useProjects();

const projectId = route.params.id as string;

// 獲取當前專案基本資料
const currentProject = getProjectById(projectId);

// 獲取推薦的其他專案
const recommendedProjects = getRecommendedProjects(projectId, 3);

const title = `${t(`${currentProject?.id}.title`)}`;
const description = t(`${currentProject?.id}.description`);
useHead({
    title,
    meta: [
        { name: 'description', content: description },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description }
    ]
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.work-detail-page {
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
