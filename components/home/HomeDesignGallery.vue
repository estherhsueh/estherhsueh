<template>
    <section class="design-gallery">
        <div class="gallery-container">
            <div class="section-header">
                <h2 class="section-title">
                    {{ $t('home.gallery.title') }}
                </h2>
                <NuxtLink
                    :to="localePath('/work')"
                    class="view-all-button"
                >
                    {{ $t('home.gallery.viewAll') }}
                    <span class="button-icon">→</span>
                </NuxtLink>
            </div>

            <div class="gallery-grid">
                <NuxtLink
                    v-for="(item, index) in galleryItems"
                    :key="index"
                    :to="localePath(`/work/${item.id}`)"
                    class="gallery-item"
                >
                    <div class="gallery-image">
                        <img
                            v-if="item.image"
                            :src="item.image"
                            :alt="item.title"
                        >
                        <div
                            v-else
                            class="gallery-image-placeholder"
                            :style="{ background: item.color }"
                        />
                    </div>
                    <div class="gallery-info">
                        <div class="gallery-text">
                            <h3 class="gallery-title">{{ item.title }}</h3>
                            <div
                                v-if="item.tags"
                                class="gallery-tags"
                            >
                                <span
                                    v-for="tag in item.tags"
                                    :key="tag"
                                    class="gallery-tag"
                                >
                                    {{ tag }}
                                </span>
                            </div>
                        </div>
                        <div class="gallery-action">
                            <div class="gallery-button">
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
const { getGalleryProjects } = useProjects();

// 獲取設計畫廊專案
const galleryItems = getGalleryProjects();
</script>

<style lang="scss" scoped>
@use '~/assets/styles/variables' as *;

.design-gallery {
    position: relative;
    width: 100%;
    padding: 80px $spacing-md 120px;
    background: #010109;

    @include md {
        padding: 100px $spacing-xl 140px;
    }

    @include lg {
        padding: 120px 140px 160px;
    }
}

.gallery-container {
    max-width: $container-full;
    margin: 0 auto;
}

.section-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
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

.view-all-button {
    display: flex;
    gap: $spacing-md;
    align-items: center;
    padding: 20px 32px;
    border-radius: 12px;
    background: #ab9dff;
    color: #161616;
    transition: all $transition-base;
    letter-spacing: 0;
    font-weight: $font-weight-medium;
    font-size: $font-size-base;
    font-family: $font-family-en;
    line-height: $line-height-16;

    .button-icon {
        transition: transform $transition-base;
        font-size: 20px;
    }

    &:hover {
        background: #b897fe;
        transform: translateY(-2px);

        .button-icon {
            transform: translateX(4px);
        }
    }
}

.gallery-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-lg;

    @include md {
        grid-template-columns: repeat(2, 1fr);
        gap: $spacing-lg;
    }

    @include lg {
        gap: $spacing-24;
    }
}

.gallery-item {
    position: relative;
    display: block;
    overflow: hidden;
    border: 1px solid #292a36;
    border-radius: 16px;
    background: #16171f;
    cursor: pointer;
    transition: all $transition-base;
    text-decoration: none;

    &:hover {
        border-color: #373946;
        box-shadow: 0 20px 60px rgb(0 0 0 / 40%);
        transform: translateY(-8px);

        .gallery-button {
            border-color: #67697c;
            background: #373946;
            transform: scale(1.05);
        }

        .button-icon {
            transform: translateX(4px);
        }
    }
}

.gallery-image {
    position: relative;
    width: 100%;
    padding-bottom: 75%;

    img {
        position: absolute;
        top: 0;
        left: 0;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}

.gallery-image-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.gallery-info {
    display: flex;
    gap: $spacing-md;
    align-items: flex-start;
    justify-content: space-between;
    padding: $spacing-lg;

    @include md {
        padding: $spacing-24;
    }
}

.gallery-text {
    flex: 1;
}

.gallery-title {
    margin-bottom: $spacing-sm;
    color: $grey-50;
    letter-spacing: 0;
    font-weight: $font-weight-semibold;
    font-size: $font-size-lg;
    font-family: $font-family-base;
    line-height: $line-height-24;

    @include md {
        font-size: 20px;
    }

    @include lg {
        font-size: $font-size-xl;
    }
}

.gallery-tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
}

.gallery-tag {
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

.gallery-action {
    flex-shrink: 0;
}

.gallery-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 52px;
    border: 1px solid #373946;
    border-radius: 8px;
    background: #292a36;
    transition: all $transition-base;

    .button-icon {
        color: $grey-50;
        transition: transform $transition-base;
        font-size: 24px;
        font-family: $font-family-en;
    }
}
</style>
