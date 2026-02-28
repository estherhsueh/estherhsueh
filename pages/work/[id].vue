<template>
    <div
        v-if="currentProject"
        class="work-detail-page"
    >
        <!-- Hero Image -->
        <WorkHero :id="currentProject.id" />

        <!-- Content -->
        <div class="work-detail-container">
            <!-- Overview Section -->
            <WorkOverview
                :id="currentProject.id"
                :duration="currentProject.duration"
            />

            <!-- Content Images Section -->
            <WorkContent :sections="projectData.sections" />

            <!-- Other Projects Section -->
            <WorkOtherProjects :projects="otherProjects" />
        </div>
    </div>
</template>

<script setup lang="ts">
import WorkHero from '~/components/workDetail/WorkHero.vue';
import WorkOverview from '~/components/workDetail/WorkOverview.vue';
import WorkContent from '~/components/workDetail/WorkContent.vue';
import WorkOtherProjects from '~/components/workDetail/WorkOtherProjects.vue';

const route = useRoute();
const { t } = useI18n();
const { getProjectById, getRecommendedProjects } = useProjects();

definePageMeta({
    title: 'Work Detail'
});

interface ProjectData {
    id: string
    title: string
    description: string
    company: string
    responsibilities: string
    duration: string
    sections: string[]
}

interface Project {
    id: string
    title: string
    tags: string[]
}

const projectId = computed(() => route.params.id as string);

// 獲取當前專案基本資料
const currentProject = computed(() => getProjectById(projectId.value));

// 專案詳細資料（從 i18n 或預設值獲取）
const projectData = computed<ProjectData>(() => {
    // 預設資料（如果專案存在但沒有詳細資訊）
    if (currentProject.value) {
        return {
            id: currentProject.value.id,
            title: currentProject.value.title,
            description: currentProject.value.description || 'Project description goes here.',
            company: 'Company Name',
            responsibilities: 'UI Design, UX Research',
            duration: '2024',
            sections: ['Section 1', 'Section 2', 'Section 3']
        };
    }

    return {
        id: 'default',
        title: 'Project Title',
        description: 'Project description goes here.',
        company: 'Company Name',
        responsibilities: 'UI Design, UX Research',
        duration: '2024',
        sections: ['Section 1', 'Section 2', 'Section 3']
    };
});

// 獲取推薦的其他專案
const otherProjects = computed<Project[]>(() => {
    const recommended = getRecommendedProjects(projectId.value, 3);
    return recommended.map((project) => ({
        id: project.id,
        title: project.title,
        tags: project.tags
    }));
});

useHead({
    title: `${$t(`${projectData.value.id}.title`)} - ${t('work.title_01')} ${t('work.title_02')}`
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.work-detail-page {
    min-height: 100vh;
    background-color: $grey-900;
}

.work-detail-container {
    max-width: $container-full;
    margin: 0 auto;
    padding: 0 $spacing-md $spacing-xxl;

    @include md {
        padding: 0 $spacing-xl $spacing-xxl;
    }

    @include lg {
        padding: 0 140px $spacing-xxl;
    }
}
</style>
