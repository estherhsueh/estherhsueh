<template>
    <div class="other-projects">
        <h2 class="section-title">
            {{ $t('workDetail.otherProjects') }}
        </h2>

        <div class="projects-grid">
            <NuxtLink
                v-for="project in projects"
                :key="project.id"
                :to="localePath(`/work/${project.id}`)"
                class="project-card"
            >
                <div class="project-image">
                    <div class="image-placeholder" />
                </div>
                <div class="project-info">
                    <div class="project-content">
                        <h3 class="project-title">
                            {{ $t(`${project.id}.title`) }}
                        </h3>
                        <div class="project-tags">
                            <span
                                v-for="(tag, index) in project.tags"
                                :key="index"
                                class="project-tag"
                            >
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                    <div class="project-button">
                        <span class="button-icon">→</span>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

interface Project {
    id: string
    title: string
    tags: string[]
}

defineProps<{
    projects: Project[]
}>();
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.other-projects {
    padding: $spacing-xxl 0;
}

.section-title {
    margin-bottom: $spacing-xl;
    color: $grey-50;
    letter-spacing: -1.28px;
    font-weight: $font-weight-medium;
    font-size: $font-size-xxl;
    font-family: $font-family-en;
    line-height: $line-height-76-8;

    @include md {
        font-size: $font-size-56;
    }

    @include lg {
        font-size: $font-size-display;
    }
}

.projects-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include md {
        grid-template-columns: repeat(3, 1fr);
        gap: $spacing-xl;
    }
}

.project-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border: 1px solid #292a36;
    border-radius: $border-radius-lg;
    background: transparent;
    transition: all $transition-base;
    text-decoration: none;

    &:hover {
        border-color: #373946;
        transform: translateY(-4px);

        .project-button .button-icon {
            transform: translateX(4px);
        }

        .image-placeholder {
            transform: scale(1.05);
        }
    }
}

.project-image {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-bottom: 72.97%;
    background: #20212b;
}

.image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #292a36 0%, #20212b 100%);
    transition: transform $transition-base;
}

.project-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-lg;
    border-top: 1px solid #292a36;
    background: #16171f;

    @include md {
        padding: $spacing-xl;
    }
}

.project-content {
    flex: 1;
}

.project-title {
    margin-bottom: $spacing-sm;
    color: $grey-50;
    letter-spacing: 0;
    font-weight: $font-weight-medium;
    font-size: $font-size-xl;
    font-family: $font-family-base;
    line-height: $line-height-24;
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
}

.project-tag {
    padding: 8px $spacing-md;
    border: 1px solid #373946;
    border-radius: 8px;
    background: #292a36;
    color: #67697c;
    letter-spacing: 0;
    font-weight: $font-weight-normal;
    font-size: $font-size-base;
    font-family: $font-family-en;
    line-height: $line-height-16;
}

.project-button {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 52px;
    border: 1px solid #373946;
    border-radius: 8px;
    background: #292a36;
}

.button-icon {
    color: $grey-50;
    transition: transform $transition-base;
    font-size: $font-size-xl;
    font-family: $font-family-en;
}
</style>
