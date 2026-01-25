<template>
    <section class="featured-projects">
        <div class="featured-container">
            <div class="section-header">
                <h2 class="section-title">
                    {{ $t('home.featured.title') }}
                </h2>
            </div>

            <div class="projects-list">
                <NuxtLink
                    v-for="project in featuredProjects"
                    :key="project.id"
                    :to="localePath(`/work/${project.id}`)"
                    class="project-card"
                >
                    <div class="project-image">
                        <img
                            v-if="project.image"
                            :src="project.image"
                            :alt="project.title"
                        >
                        <div
                            v-else
                            class="project-image-placeholder"
                        >
                            {{ project.title.charAt(0) }}
                        </div>
                    </div>

                    <div class="project-content">
                        <div class="project-info">
                            <h3 class="project-title">
                                {{ project.title }}
                            </h3>
                            <p class="project-description">
                                {{ project.description }}
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
                            <div class="project-button">
                                <span class="button-icon">→</span>
                            </div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
const { getFeaturedProjects } = useProjects();

// 獲取精選專案
const featuredProjects = getFeaturedProjects();
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.featured-projects {
    position: relative;
    width: 100%;
    padding: 80px $spacing-md;
    background: #010109;

    @include md {
        padding: 100px $spacing-xl;
    }

    @include lg {
        padding: 120px 140px;
    }
}

.featured-container {
    max-width: $container-full;
    margin: 0 auto;
}

.section-header {
    margin-bottom: $spacing-xl;

    @include md {
        margin-bottom: 60px;
    }
}

.section-title {
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

.projects-list {
    display: flex;
    flex-direction: column;
    gap: $spacing-xl;

    @include lg {
        gap: 40px;
    }
}

.project-card {
    display: flex;
    flex-direction: column;
    gap: $spacing-lg;
    overflow: hidden;
    border: 1px solid #292a36;
    border-radius: 16px;
    background: #20212b;
    cursor: pointer;
    transition: all $transition-base;
    text-decoration: none;

    @include md {
        flex-direction: row;
        gap: 40px;
    }

    &:hover {
        border-color: #373946;
        box-shadow: 0 20px 40px rgb(0 0 0 / 30%);
        transform: translateY(-4px);

        .project-button {
            background: #a175fd;
            transform: scale(1.05);
        }

        .button-icon {
            transform: translateX(4px);
        }
    }
}

.project-image {
    position: relative;
    overflow: hidden;
    width: 100%;
    padding-bottom: 56.25%;

    @include md {
        flex-shrink: 0;
        width: 580px;
        padding-bottom: 0;
        aspect-ratio: 580 / 360;
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}

.project-image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #7042d2 0%, #8952fd 100%);
    color: $grey-50;
    font-weight: $font-weight-bold;
    font-size: 64px;
    font-family: $font-family-en;
}

.project-content {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: $spacing-lg;
    padding: $spacing-lg;

    @include md {
        justify-content: space-between;
        padding: $spacing-xl $spacing-xl $spacing-xl 0;
    }
}

.project-info {
    flex: 1;
}

.project-title {
    margin-bottom: $spacing-md;
    color: $grey-50;
    letter-spacing: 0;
    font-weight: $font-weight-medium;
    font-size: 24px;
    font-family: $font-family-base;
    line-height: 38.4px;

    @include md {
        font-size: $font-size-28;
    }

    @include lg {
        font-size: $font-size-xxl;
    }
}

.project-description {
    max-width: 460px;
    color: $grey-200;
    letter-spacing: 0;
    font-weight: $font-weight-normal;
    font-size: $font-size-sm;
    font-family: $font-family-base;
    line-height: $line-height-25-6;

    @include md {
        font-size: $font-size-base;
    }

    @include lg {
        font-size: $font-size-lg;
        line-height: $line-height-32-4;
    }
}

.project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
}

.project-tag {
    padding: 8px 16px;
    border: 1px solid #373946;
    border-radius: 8px;
    background: #292a36;
    color: #67697c;
    transition: all $transition-base;
    letter-spacing: 0;
    font-weight: $font-weight-normal;
    font-size: $font-size-base;
    font-family: $font-family-en;
    line-height: $line-height-16;

    &:hover {
        border-color: #67697c;
        background: #373946;
        color: $grey-50;
    }
}

.project-action {
    display: flex;
    justify-content: flex-end;
}

.project-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 52px;
    border: 1px solid #373946;
    border-radius: 8px;
    background: #b897fe;
    transition: all $transition-base;
}

.button-icon {
    color: #161616;
    transition: transform $transition-base;
    font-size: 24px;
    font-family: $font-family-en;
}
</style>
